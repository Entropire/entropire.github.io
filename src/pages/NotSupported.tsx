import NotSupportedCSS from "../styles/pages/NotSupported.module.css";
import image from "../assets/images/BuildingCat.jpg";

export const NotSupported = () => {
    return(
        <>
            <div className={NotSupportedCSS["Not-Supported"]}>
                <img src={image} alt="Building cat" />
                <h2>Hang tight! This screen size isnt ready yet.</h2>
                
            </div>
        </>
    );
}