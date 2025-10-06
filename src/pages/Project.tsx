import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; 
import ProjectCSS from "../styles/pages/Project.module.css";

export const Project = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!projectName) return;

    fetch(`/projects/${projectName.toLowerCase()}.html`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then((content) => setHtml(content))
      .catch(() => setError(true));
  }, [projectName]);

  useEffect(() => {
    if (!html) return;

    hljs.highlightAll();

    const buttons = document.querySelectorAll<HTMLButtonElement>(
      "button[data-scroll-id]"
    );
    buttons.forEach((btn) => {
      const id = btn.getAttribute("data-scroll-id");
      if (id) {
        btn.onclick = () => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        };
      }
    });

    return () => {
      buttons.forEach((btn) => {
        btn.onclick = null;
      });
    };
  }, [html]);

  
  if (error) return <p>Project not found</p>;
  if (!html) return <p>Loading project...</p>;

  return (
    <>
      <div
      className={ProjectCSS.ProjectContent}
      dangerouslySetInnerHTML={{ __html: html }}/>
    </>
  );
};
