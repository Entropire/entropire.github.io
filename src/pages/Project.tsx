import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCSS from "../styles/pages/Project.module.css";
import "../styles/components/HightLightJS.css";

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

    const buttons = document.querySelectorAll<HTMLButtonElement>(
      "button[data-scroll-id]"
    );
    buttons.forEach((btn) => {
      const id = btn.getAttribute("data-scroll-id");
      if (id) {
        btn.onclick = () => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
        };
      }
    });

    return () => buttons.forEach((btn) => (btn.onclick = null));
  }, [html]);

useEffect(() => {
  if (!html) return;

  const navButtons = document.querySelectorAll<HTMLButtonElement>(
    ".Navigation button[data-scroll-id]"
  );
  const sections = Array.from(navButtons)
    .map((btn) => document.getElementById(btn.dataset.scrollId || ""))
    .filter(Boolean) as HTMLElement[];

  if (sections.length === 0) return;

  const handleScroll = () => {
    const center = window.innerHeight / 2;

    let closestSection: HTMLElement | null = null;
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionMid = rect.top + rect.height / 2;
      const distance = Math.abs(center - sectionMid);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      navButtons.forEach((btn) => {
        btn.classList.toggle(
          "active",
          btn.dataset.scrollId === closestSection!.id
        );
      });
    }
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [html]);


  if (error) return <p className={ProjectCSS.ProccesingText}>Project not found</p>;
  if (!html) return <p className={ProjectCSS.ProccesingText}>Loading project...</p>;

  return (
    <div
      className={ProjectCSS.ProjectPage}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
