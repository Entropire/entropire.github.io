import "../css/pages/NotFound.css";
import image from "../assets/404.jpg";

export const NotFound = () => {
    return(
        <>
            <div className="Page-Not-Found">
                <img src={image} alt="Hiding cat" />
                <h2>404 - Page not found</h2>
            </div>
        </>
    );
}