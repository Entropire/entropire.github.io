import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";

const contentDir = "./content"; 
const indexOutputDir = "./src/data"; 
const projectOutputDir = "./public/projects";

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

function tokenToHTML(token) {
  switch (token.type) {
    case "heading":
      return `<h${token.depth}>${token.text}</h${token.depth}>`;
    case "paragraph":
      return `<p>${token.text}</p>`;
    case "code":
      return `<pre><code class="language-${token.lang || ""}">${token.text}</code></pre>`;
    case "list":
      const items = token.items.map(i => `<li>${i.text}</li>`).join("");
      return token.ordered ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
    default:
      return "";
  }
}

(async () => {
  await fs.emptyDir(indexOutputDir);
  await fs.emptyDir(projectOutputDir);

  const files = await fs.readdir(contentDir);
  const projects = [];
  const filters = {};

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = path.join(contentDir, file);
    const raw = await fs.readFile(fullPath, "utf-8");

    const { data, content } = matter(raw);

    const tokens = marked.lexer(content);
    const htmlContent = tokens.map(tokenToHTML).join("\n");

    const project = {
      title: data.title,
      description: data.description,
      image: data.image,
      tags: data.tags,
      date: data.date,
    };

    projects.push(project);

    if (data.tags) {
      Object.entries(data.tags).forEach(([category, values]) => {
        values.forEach((tag) => {
          if (!filters[category]) filters[category] = [];
          if (!filters[category].includes(tag)) filters[category].push(tag);
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
