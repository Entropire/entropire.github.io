import { useState, useRef, useEffect} from "react";
import { NavLink } from "react-router-dom";
import ProjectsCSS from "../styles/pages/Projects.module.css";
import CardCSS from "../styles/components/Card.module.css";
import Filters from "../data/filters.json";
import ProjectsData from "../data/projects.json";

export const Projects = () => {
    const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
    const projects = (ProjectsData as Project[]);

    type Project = {
    title: string;
    description: string;
    image: string;
    tags: {
        [key: string]: string | string[];
    };
    date: string;
    };

    const filtersElements = Object.entries(Filters)
        .filter(([_, options]) => options.length > 1)
        .map(([filterType, options]) => {
            console.log(filterType)
            if (filterType === "Year") {
                const sortedOptions = [...options].sort((a, b) => Number(b) - Number(a));

                return (
                    <div key={filterType} className={ProjectsCSS["Filter-Group"]}>
                        <h4>{filterType}</h4>
                            <select
                            className={ProjectsCSS["Filter-Options"]}
                            value={activeFilters[filterType] || "0"}
                            onChange={(e) => handleCheckboxChange(filterType, e.target.value, true)}
                            >
                            <option key="All Years" value="">All Years</option>
                            {sortedOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }

            return(
                <div key={filterType} className={ProjectsCSS["Filter-Group"]}>
                    <h4>{filterType}</h4>
                    <div className={ProjectsCSS["Filter-Options"]}>
                        {options.map((option) => (
                            <label key={option} className={ProjectsCSS["Filter-Option"]}>
                                <input
                                    type="checkbox"
                                    checked={activeFilters[filterType]?.includes(option) || false}
                                    onChange={(e) =>handleCheckboxChange(filterType, option, e.target.checked)}
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
            );
        });

    const projectsElements = projects.map((project) => (
        <NavLink 
        to={`/Projects/${project.title}`} 
        className={CardCSS.Card} 
        key={project.title}
            ref={(el) => {
                if (el) refs.current[project.title] = el;
                else delete refs.current[project.title];
        }}
        >
            <div className={CardCSS["Card-Top"]} style={{ backgroundImage: `url(${project.image})` }}>
                <div className={CardCSS["Card-Icons"]}></div>
            </div>
            <div className={CardCSS["Card-Bottom"]}>
                <b>{project.title}</b>
                <p>{project.description}</p>
            </div>
        </NavLink>
    ));

    const handleCheckboxChange = (key: string, option: string, checked: boolean) => {
        setActiveFilters((prevFilters) => {
            const newFilters = { ...prevFilters };

        if (key === "Year") {            
            if (!option) {
                delete newFilters[key];
            } else {
                newFilters[key] = [option];
            }
            return newFilters;
        }

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
        projects?.forEach((project) => {
            const matchesFilters = Object.keys(activeFilters).every((key) => {
                if (!activeFilters[key] || activeFilters[key].length === 0) return true;
                return activeFilters[key].some((filter) => project.tags[key]?.includes(filter));
            });

            const projectElement = refs.current[project.title];
            if (projectElement) {
                projectElement.style.display = matchesFilters ? "block" : "none";
            }
        });
    }, [activeFilters, projects]);

    const hasError = filtersElements === null || projectsElements === null; 

    return (
        <div className={ProjectsCSS["Projects-Page"]}>
                {hasError ? (
                    <p>Error while loading project</p>
                ) : (
                    <>
                        <div className={ProjectsCSS["Filter-Container"]}>{filtersElements}</div>
                        <div className={ProjectsCSS["Card-Container"]}>{projectsElements}</div>
                    </>
                )}
        </div>
    );
};