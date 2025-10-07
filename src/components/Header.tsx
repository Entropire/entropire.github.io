import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderCSS from '../styles/components/Header.module.css'

export const Header = () => {
    const [manualTheme, setManualTheme] = useState<"light" | "dark" | null>(null);

    const [systemPrefersDark, setSystemPrefersDark] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    const theme = systemPrefersDark ? "dark" : "light";

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", manualTheme || theme);
    }, [theme, manualTheme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
        setSystemPrefersDark(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = () => {
        setManualTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };


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
