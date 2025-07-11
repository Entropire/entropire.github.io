import { useEffect, useState, type JSX } from "react";
import { NavLink } from "react-router-dom";
import HomeCSS from "../css/pages/Home.module.css";
import CardCSS from "../css/components/Card.module.css";

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
        const firstThree = data.slice(0, 4).map((item, index) => (
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
        setElements(firstThree);
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
            <div className={HomeCSS["Home-Page"]}>
                <div className={HomeCSS["Banner"]}>
                    <div className={HomeCSS["Banner-Text"]}>
                        <h1>Quinten Duijster</h1>   
                        <h3>An energetic software/game developer</h3>     
                    </div>
                    <img className={HomeCSS["Banner-Icon"]} src="./favicon.png" alt="profile picture" />
                </div>   
                <button className={HomeCSS["Arrow"]} id="Arrow" style={{opacity, transition: "opacity 0.1s ease-out"}} onClick={handleScroll}></button>

                <div className={HomeCSS["Projects-Preview"]}>
                    <h3>Projects Preview</h3>
                    <div className={HomeCSS["Card-Container"]}>    
                        { useJsonElements("./json/Projects.json") || <p>Loading projects...</p> }
                        <NavLink to="/Projects" className={HomeCSS["Show-All"]} />
                    </div>
                </div>
                {/* <div className={HomeCSS["Posts-Preview"]}>
                    <h3>Post Preview</h3>
                    <div className={HomeCSS["Card-Container"]}>
                        { useJsonElements("./json/Posts.json") || <p>Loading posts...</p> }
                        <NavLink to="/Blog" className={HomeCSS["Show-All"]} />
                    </div>
                </div> */}
            </div>
        </>
    );
}