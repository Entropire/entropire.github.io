import { useRef, useEffect, useState, type JSX, use } from "react";
import { NavLink } from "react-router-dom";
import ProjectsCSS from "../css/pages/Projects.module.css";
import CardCSS from "../css/components/Card.module.css";

export const Projects = () => {
    const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const [projects, setProjects] = useState<Project[]>([]);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

    type Project = {
        id: number;
        title: string;
        description: string;
        image: string;
        link: string;
        tags: { [key: string]: string[] };
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
                        if (!tagFilters[key].includes(tag)) {
                            tagFilters[key].push(tag);
                        }
                    });
                });
            });

            const cleanedFilters: Record<string, string[]> = {};
            Object.entries(tagFilters).forEach(([key, values]) => {
            if (values.length > 1) {
                cleanedFilters[key] = values;
            }
            });

            setFilters(cleanedFilters);
        })
        .catch((err) => console.error("Failed to load projects:", err));
    }, []);

    function LoadProjectCards(): JSX.Element[] | null {
        const cards = projects.map((project) => (
            <NavLink
                to={`/Projects/${project.title}`}
                className={CardCSS.Card}
                key={project.id}
                ref={(el) => {
                    if (el) refs.current[project.id] = el;
                    else delete refs.current[project.id];
                }}
            >
                <div
                    className={CardCSS["Card-Top"]}
                    style={{ backgroundImage: `url(${project.image})` }}
                >
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
        setActiveFilters((prevFilters) => {
            const newFilters = { ...prevFilters };

            if (!newFilters[key]) {
                newFilters[key] = [];
            }

            if (checked) {
                if (!newFilters[key].includes(option)) {
                    newFilters[key].push(option);
                }
            } else {
                newFilters[key] = newFilters[key].filter((item) => item !== option);
            }

            return newFilters;
        });
    };

    useEffect(() => {
        projects.forEach((project) => {
            const matchesFilters = Object.keys(activeFilters).every((key) => {
                if (!activeFilters[key] || activeFilters[key].length === 0) return true;
                return activeFilters[key].some((filter) => project.tags[key]?.includes(filter));
            });

            const projectElement = refs.current[project.id];
            if (projectElement) {
                projectElement.style.display = matchesFilters ? "block" : "none";
            }
        });
    }, [activeFilters, projects]);

    return (
        <div className={ProjectsCSS["Projects-Page"]}>
                <div className={ProjectsCSS["Filter-Container"]}>
                    {Object.keys(filters).map((key) => (
                        <div key={key} className={ProjectsCSS["Filter-Group"]}>
                            <h4>{key}</h4>
                            <div className={ProjectsCSS["Filter-Options"]}>
                                {filters[key].map((option) => (
                                    <label key={option} className={ProjectsCSS["Filter-Option"]}>
                                        <input
                                            type="checkbox"
                                            checked={activeFilters[key]?.includes(option) || false}
                                            onChange={(e) =>
                                                handleCheckboxChange(key, option, e.target.checked)
                                            }
                                        />
                                        <span className={ProjectsCSS["Checkmark"]}>
                                            <svg width="12px" height="12px" viewBox="0 0 12 11">
                                                <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                                            </svg>
                                        </span>
                                        <span>{option}</span>
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
