import { Link } from "react-router-dom";

export const Header = () => {
    return(
        <>
            <header>
                <nav>
                    <ul>
                        <li><Link to="Home"/></li>
                        <li><Link to="About"/></li>
                        <li><Link to="Contact"/></li>
                        <li><Link to="Blog"/></li>
                    </ul>
                    <ul>
                        
                    </ul>
                </nav>
            </header>
        </>
    );
}