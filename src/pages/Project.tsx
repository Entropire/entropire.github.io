import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

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
    if (html) {
      hljs.highlightAll();
    }
  }, [html]);

  if (error) return <p>Project not found</p>;
  if (!html) return <p>Loading project...</p>;

  return (
    <div
      className="project-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
