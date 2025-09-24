import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, "../content");
const outputDir = path.join(__dirname, "../src/data");

(async () => {
  const files = await fs.readdir(contentDir);
  const projects = [];
  const filters = {};

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const fullPath = path.join(contentDir, file);
    const raw = await fs.readFile(fullPath, "utf-8");

    const { data, content } = matter(raw);
    const html = marked(content);

    const project = {
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      tags: data.tags,
      date: data.date,
      excerpt: content.substring(0, 200) + "..."
    };

    projects.push(project);

    Object.entries(data.tags || {}).forEach(([category, values]) => {
      values.forEach((tag) => {
        if (!filters[category]) filters[category] = {};
        if (!filters[category][tag]) filters[category][tag] = [];
        filters[category][tag].push(project.slug);
      });
    });

    const htmlPath = path.join(outputDir, `${project.slug}.html`);
    await fs.outputFile(htmlPath, html);
  }

  await fs.outputJson(path.join(outputDir, "projects.json"), projects, { spaces: 2 });
  await fs.outputJson(path.join(outputDir, "filters.json"), filters, { spaces: 2 });

  console.log("✅ Content built!");
})();
