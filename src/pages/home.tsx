import { useEffect, useState, type JSX } from "react";
import { NavLink } from "react-router-dom";
import HomeCSS from "../styles/pages/Home.module.css";
import CardCSS from "../styles/components/Card.module.css";
import Projects from "../data/projects.json";

export const Home = () => {
  const handleScroll = () => {
    document.getElementById("Arrow")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeOutHeight = 400; 
      const newOpacity = Math.max(1 - scrollY / fadeOutHeight, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


type Project = {
  title: string;
  description: string;
  image: string;
  tags: {
    [key: string]: string | string[];
  };
  date: string;
};

function LoadProjectPreview(): JSX.Element[] | null {
  const [elements, setElements] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    try {
      const firstFour = (Projects as Project[]).slice(0, 4).map((project) => (
        <NavLink to={`/Projects/${project.title}`} className={CardCSS.Card} key={project.title}>
          <div className={CardCSS["Card-Top"]} style={{ backgroundImage: `url(${project.image})` }}>
            <div className={CardCSS["Card-Icons"]}></div>
          </div>
          <div className={CardCSS["Card-Bottom"]}>
            <b>{project.title}</b>
            <p>{project.description}</p>
          </div>
        </NavLink>
      ));

      setElements(firstFour);
    } catch (err) {
      console.error("Failed to load JSON:", err);
      setElements([]);
    }
  }, []);

  return elements;
}

const projects = LoadProjectPreview();

    return(
        <>
            <div className={HomeCSS["Home-Page"]}>
                <div className={HomeCSS["Banner"]}>
                    <div className={HomeCSS["Banner-Text"]}>
                        <h1>Quinten Duijster</h1>   
                        <h3>An energetic backend developer</h3>     
                    </div>
                    <img className={HomeCSS["Banner-Icon"]} src="./favicon.png" alt="profile picture" />
                </div>   
                <button className={HomeCSS["Arrow"]} id="Arrow" style={{opacity, transition: "opacity 0.1s ease-out"}} onClick={handleScroll}></button>

                <div className={HomeCSS["Projects-Preview"]}>
                    <h3>Projects Preview</h3>
                  <div className={HomeCSS["Card-Container"]}>    
                    {
                    projects && projects.length > 0 ? (
                      <>
                        {projects}
                        <NavLink to="/Projects" className={HomeCSS["Show-All"]}>
                          <h4>Show All Projects</h4>
                        </NavLink>
                      </>
                    ) : projects && projects.length === 0 ? (
                      <p>No projects found!</p>
                    ) : (
                      <p>Loading projects...</p>
                    )
                    }
                  </div>
                </div>
            </div>
        </>
    );
}