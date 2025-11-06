import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";

const contentDir = "./content"; 
const indexOutputDir = "./src/data"; 
const projectOutputDir = "./public/projects";

const renderer = {
  code(code, lang, isEscaped) {
    const safeCode = typeof code === "string" ? code : code?.text || "";

    const highlighted = lang && hljs.getLanguage(lang)
      ? hljs.highlight(safeCode, { language: lang, ignoreIllegals: true }).value
      : hljs.highlightAuto(safeCode).value;

    return `<pre><code class="language-${lang || ""}">${highlighted}</code></pre>`;
  },
  heading(token) {
    const text = typeof token === "string" ? token : token.text || "";
    const level = token?.depth || 1;

    if (level === 2) {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); 
      return `<h3 id="${id}">${text}</h3>`;
    }
    if(level === 3){
       return `<h4>${text}</h4>`;
    }
    return `<h${level}>${text}</h${level}>`;
  },
  image(href, title, text) {
    const safeHref = typeof href === "string" ? href : href?.href || href?.text || "";

    const imgTitle = title ? ` title="${title}"` : "";
    const imgSrc = path.posix.join("projects", safeHref);

    return `<div>
              <img src="${imgSrc}" alt="${text}"${imgTitle} loading="lazy" class="custom-image" />
            </div>`;
  },
  paragraph(token) {
      const text = typeof token === "string" ? token : token.text || "";

      if (text.trimStart().startsWith("//")) {
        return `<p class="Comment">${text}</p>`;
      }

      const mdImageRegex = /!\[(.*?)\]\((.*?)(?: "(.*?)")?\)/;
      const match = text.match(mdImageRegex);
      if (match) {
        const [, alt, href, title] = match;
        return this.image(href, title, alt);
      }

      if (token.tokens) {
        return `<p>${token.tokens.map(t => {
          switch (t.type) {
            case "text": return t.raw;
            case "link": return this.link(t.href, t.title, t.text);
            case "codespan": return `<code>${t.text}</code>`;
            case "strong": return `<strong>${t.text}</strong>`;
            case "em": return `<em>${t.text}</em>`;
            default: return t.raw;
          }
        }).join("")}</p>`;
      }

      return `<p>${text}</p>`;
  },
  link(href, title, text) {
    const isExternal = href.startsWith("http");
    const className = isExternal ? "external-link" : "internal-link";
    return `<a href="${href}" title="${title || ''}" class="${className}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
  }
};

const iframeExtension = {
  name: "iframe",
  level: "block",
  start(src) {
    return src.match(/^:::iframe\s+/)?.index;
  },
  tokenizer(src) {
    const rule = /^:::iframe\s+(?<url>\S+)(?:\s+width=(?<width>\d+))?(?:\s+height=(?<height>\d+))?:::\s*(?:\n|$)/;
    const match = rule.exec(src);
    if (match) {
      const { url, width, height } = match.groups;
      return {
        type: "iframe",
        raw: match[0], 
        url,
        width: width || "100%",
        height: height || "400",
      };
    }
  },
  renderer(token) {
    return `
      <div class="iframe-container">
        <iframe
          src="${token.url}"
          width="${token.width}"
          height="${token.height}"
          loading="lazy"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    `;
  },
};


marked.use({ renderer, extensions: [iframeExtension] });

(async () => {
  await fs.emptyDir(indexOutputDir);
  await fs.emptyDir(projectOutputDir);

  const files = await fs.readdir(contentDir); 
  const projects = [];
  const filters = {};


  await fs.copy(path.join(contentDir, "Img"), path.join(projectOutputDir, "Img"));

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = path.join(contentDir, file);
    const raw = await fs.readFile(fullPath, "utf-8");

    const { data, content } = matter(raw);

    const tokens = marked.lexer(content);

    const h2Tokens = tokens.filter(token => token.type === "heading" && token.depth === 2);

    const toc = h2Tokens.map(token => {
      const id = token.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); 
      return { text: token.text, id };
    });

    const project = {
      title: data.title,
      description: data.description,
      image: path.posix.join("projects", data.image),
      links: data.links,
      tags: data.tags,
      date: data.date,
    };

    const htmlContent =
    `    
      <div class="Header">
        <h1>${data.title}</h1>
        <p>${data.description}</p>
      </div>
      <div class="ProjectContent">
        <div class="Navigation">
          <ul>
            <li><h4>Table of Contents</h4></li>
            ${toc.map(item => `<li><button data-scroll-id="${item.id}">${item.text}</button></li>`).join("\n")}
          </ul>
        </div> 
        <div class="MainContent">
          ${marked(content)}        
        </div>
        <div class="ProjectMeta">   
          ${
            data.tags
              ? Object.entries(data.tags)
                  .map(([category, options]) => {
                    if (!Array.isArray(options)) return "";
                    return `
                      <div class="${category}">
                        <h4>${category}</h4>
                        ${options
                          .filter(option => option.trim() !== "")
                          .map(option => `<p value="${option}">${option}</p>`)
                          .join("")}
                      </div>
                    `;
                  })
                  .join("")
              : ""
          }
          <div class="Links">
            <h4>Links</h4>
            ${
              data.links
                ? data.links
                    .map(linkObj => {
                      return `
                        <a href="${linkObj.url}" target="_blank" rel="noopener noreferrer">
                          <p>${linkObj.name}</p>
                        </a>
                      `;
                    })
                    .join("")
                : ""
            }
          </div>
        </div>
      </div>
    `;

    projects.push(project);

    if (data.tags) {
      Object.entries(data.tags).forEach(([category, values]) => {
        values.forEach((tag) => {
          if (!filters[category]) filters[category] = [];
          if (!filters[category].includes(tag) && tag != "") filters[category].push(tag);
        });
      });
    }

    const slug = data.title.toLowerCase().replace(/\s+/g, "-");
    const htmlPath = path.join(projectOutputDir, `${slug}.html`);
    await fs.outputFile(htmlPath, htmlContent);
  }

  await fs.outputJson(path.join(indexOutputDir, "projects.json"), projects, { spaces: 2 });
  await fs.outputJson(path.join(indexOutputDir, "filters.json"), filters, { spaces: 2 });

  console.log("Content built!");
})();
