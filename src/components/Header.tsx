import { NavLink } from "react-router-dom";
import '../css/components/header.css'

export const Header = () => {
    return(
        <>
            <header className="Header">
                <nav className="Header-Nav">
                    <div className="Header-Nav-Center">
                        <NavLink to="/" className="Nav-Link">Home</NavLink>
                        <NavLink to="/About" className="Nav-Link">About</NavLink>
                        <NavLink to="/Contact" className="Nav-Link">Contact</NavLink>
                        <NavLink to="/Blog" className="Nav-Link">Blog</NavLink>
                    </div>
                    <div className="Header-Nav-Right">
                        <button>dark</button>
                        <button>NL</button>
                    </div>
                </nav>
            </header>
        </>
    );
}