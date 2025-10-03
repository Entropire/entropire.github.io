import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";

const contentDir = "./content"; 
const outputDir = "./src/data"; 

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

// Escape JSX special characters
function escapeJSX(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;");
}

// Convert marked tokens to JSX
function tokenToJSX(token) {
  switch (token.type) {
    case "heading":
      return `<h${token.depth}>${escapeJSX(token.text)}</h${token.depth}>`;
    case "paragraph":
      return `<p>${escapeJSX(token.text)}</p>`;
    case "code":
      return `<pre><code className="language-${token.lang || ""}">{\`${token.text}\`}</code></pre>`;
    case "list":
      const items = token.items.map(i => `<li>${escapeJSX(i.text)}</li>`).join("");
      return token.ordered ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
    default:
      return "";
  }
}

(async () => {
  await fs.emptyDir(outputDir);

  const files = await fs.readdir(contentDir);
  const projects = [];
  const filters = {};

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = path.join(contentDir, file);
    const raw = await fs.readFile(fullPath, "utf-8");

    const { data, content } = matter(raw);

    const tokens = marked.lexer(content);
    const jsxContent = tokens.map(tokenToJSX).join("\n");

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

    const safeName = data.title.replace(/[^a-zA-Z0-9_]/g, "_");
    const slug = data.title.toLowerCase().replace(/\s+/g, "-");

    const component = `
      import React from "react";

      export default function ${safeName}() {
        return (
          <>
            ${jsxContent}
          </>
        );
      }
    `;

    const tsxPath = path.join(outputDir, `${slug}.tsx`);
    await fs.outputFile(tsxPath, component);
  }

  await fs.outputJson(path.join(outputDir, "projects.json"), projects, { spaces: 2 });
  await fs.outputJson(path.join(outputDir, "filters.json"), filters, { spaces: 2 });

  console.log("Content built!");
})();
