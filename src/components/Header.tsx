import { NavLink } from "react-router-dom";
import HeaderCSS from '../styles/components/Header.module.css'
import { useTheme } from "./UseTheme";

export const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return(
        <>
            <header className={HeaderCSS.Header}>
                <nav className={HeaderCSS['Header-Nav']}>
                    <NavLink to="/" className={HeaderCSS['Header-Nav-Left']}>
                        <img src="./favicon.png" alt="Logo" />
                        <p>Quinten Duijster</p>
                    </NavLink>
                    <div className={HeaderCSS['Header-Nav-Center']}>
                        <NavLink to="/" className={({ isActive }) =>
                                isActive
                                    ? `${HeaderCSS['Nav-Link']} ${HeaderCSS.active}`
                                    : HeaderCSS['Nav-Link']
                            }>Home</NavLink>
                        <NavLink to="/projects" className={({ isActive }) =>
                                isActive
                                    ? `${HeaderCSS['Nav-Link']} ${HeaderCSS.active}`
                                    : HeaderCSS['Nav-Link']
                            }>Projects</NavLink>
                        <NavLink to="/About" className={({ isActive }) =>
                                isActive
                                    ? `${HeaderCSS['Nav-Link']} ${HeaderCSS.active}`
                                    : HeaderCSS['Nav-Link']
                            }>About</NavLink>
                        <NavLink to="/Contact" className={({ isActive }) =>
                                isActive
                                    ? `${HeaderCSS['Nav-Link']} ${HeaderCSS.active}`
                                    : HeaderCSS['Nav-Link']
                            }>Contact</NavLink>
                        {/* <NavLink to="/Blog" className={({ isActive }) =>
                                isActive
                                    ? `${HeaderCSS['Nav-Link']} ${HeaderCSS.active}`
                                    : HeaderCSS['Nav-Link']
                            }>Blog</NavLink> */}
                    </div>
                    <div className={HeaderCSS["Header-Nav-Right"]}>
                        <button onClick={toggleTheme}>{theme == "dark" ? "Light" : "Dark"}</button>
                    </div>
                </nav>
            </header>
        </>
    );
}
