import NotFoundCSS from "../css/pages/NotFound.module.css";
import image from "../assets/404.jpg";

export const NotFound = () => {
    return(
        <>
            <div className={NotFoundCSS["Page-Not-Found"]}>
                <img src={image} alt="Hiding cat" />
                <h2>404 - Page not found</h2>
            </div>
        </>
    );
}