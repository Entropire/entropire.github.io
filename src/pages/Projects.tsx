import { useEffect, useState, type JSX } from "react";
import { NavLink } from "react-router-dom";
import ProjectsCSS from "../css/pages/Projects.module.css";
import CardCSS from "../css/components/Card.module.css";

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});


 type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: { [key: string]: string[]};
};

  useEffect(() => {
    fetch("./json/Projects.json")
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);

        const tagFilters: Record<string, string[]> = {};
        data.forEach((project) => {
          Object.keys(project.tags).forEach((key) => {
            if (!tagFilters[key]) {
              tagFilters[key] = [];
            }
            project.tags[key].forEach((tag) => {
              if (!tagFilters[key].includes(tag)){
                tagFilters[key].push(tag);
              }
            });
          });
        });
        setFilters(tagFilters);
      })
      .catch((err) => console.error("Failed to load projects:", err));
  }, []);

 function LoadProjectCards(): JSX.Element[] | null {
          const cards = projects.map((project) => (
          <NavLink to={`/Projects/${project.title}`} className={CardCSS.Card} key={project.id}>
            <div className={CardCSS["Card-Top"]} style={{ backgroundImage: `url(${project.image})` }}>
              <div className={CardCSS["Card-Icons"]}></div>
            </div>
            <div className={CardCSS["Card-Bottom"]}>
              <b>{project.title}</b>
              <p>{project.description}</p>
            </div>
          </NavLink>
        ));
      return cards;
 }

const handleCheckboxChange = (key: string, option: string, checked: boolean) => {
  setActiveFilters(prev => {
    const prevOptions = prev[key] || [];

    let newOptions;
    if (checked) {
      newOptions = [...prevOptions, option];
    } else {
      newOptions = prevOptions.filter(item => item !== option);
    }

    return {
      ...prev,
      [key]: newOptions
    };
  });
};



  return (
    <div className={ProjectsCSS["Projects-Page"]}>
      <div className={ProjectsCSS["Filter-Container"]}>
        {Object.keys(filters).map((key) => (
          <div key={key} className={ProjectsCSS["Filter-Group"]}>
            <h4>{key}</h4>
            <div className={ProjectsCSS["Filter-Options"]}>
              {filters[key].map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={activeFilters[key]?.includes(option) || false} 
                  onChange={(e) => handleCheckboxChange(key, option, e.target.checked)}
                />
                {option}
              </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={ProjectsCSS["Card-Container"]}>
        {LoadProjectCards() || <p>Loading projects...</p>}
      </div>
    </div>
  );
};