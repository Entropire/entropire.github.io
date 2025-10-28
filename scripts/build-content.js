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
  paragraph(text) {
    const safeText = typeof text === "string" ? text : text?.text || "";

    if(safeText.trimStart().startsWith("//"))
    {
      return `<p class="Comment">${safeText}</p>`;
    }

    const mdImageRegex = /!\[(.*?)\]\((.*?)(?: "(.*?)")?\)/;
    const match = safeText.match(mdImageRegex);

    if (match) {
      const [, alt, href, title] = match;
      return this.image(href, title, alt); // pass all three arguments
    }

    return `<p>${safeText}</p>`;
  }
};

marked.use({ renderer });

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

    marked.use(renderer);
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
