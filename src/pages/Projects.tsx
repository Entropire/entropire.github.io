import { useEffect, useState, type JSX } from "react";
import { NavLink } from "react-router-dom";
import ProjectsCSS from "../css/pages/Projects.module.css";
import CardCSS from "../css/components/Card.module.css";

export const Projects = () => {
 type Item = {
  id: number;
  title: string;
  description: string;
  image: string; 
  link: string; 
};

function useJsonElements(filePath: string): JSX.Element[] | null {
  const [elements, setElements] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.json())
      .then((data: Item[]) => {
        const Projects = data.map((item, index) => (
            <NavLink to={`/Projects/${item.title}`} className={CardCSS.Card} key={item.id}>
              <div className={CardCSS["Card-Top"]} style={{ backgroundImage: `url(${item.image})` }}>
                <div className={CardCSS["Card-Icons"]}>
                </div>
              </div>
              <div className={CardCSS["Card-Bottom"]}>
                <b>{item.title}</b>
                <p>{item.description}</p>
              </div>
            </NavLink>
        ));
        setElements(Projects);
      })
      .catch((err) => {
        console.error("Failed to load JSON:", err);
        setElements([]);
      });
  }, [filePath]);

  return elements;
}   

    return(
        <>
            <div className={ProjectsCSS["Projects-Page"]}>
                <nav className={ProjectsCSS["Projects-Nav"]}>
                  <select
                  >
                    <option value="all">All Categories</option>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="game">Game</option>
                    {/* Add more categories as needed */}
                  </select>
                  <label>
                    <input
                      type="checkbox"
                    />
                    Featured Only
                  </label>
                  <input
                    type="text"
                    placeholder="Search projects..."
                  />
                </nav>
                <div className={ProjectsCSS["Card-Container"]}>
                    { useJsonElements("./json/Projects.json") || <p>Loading projects...</p> }
                </div>
            </div>
        </>
    );
}