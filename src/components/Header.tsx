import { NavLink } from "react-router-dom";
import HeaderCSS from '../css/components/Header.module.css'

export const Header = () => {
    return(
        <>
            <header className={HeaderCSS.Header}>
                <nav className={HeaderCSS['Header-Nav']}>
                    <div className={HeaderCSS['Header-Nav-Center']}>
                        <NavLink to="/" className={HeaderCSS['Nav-Link']}>Home</NavLink>
                        <NavLink to="/projects" className={HeaderCSS['Nav-Link']}>Projects</NavLink>
                        <NavLink to="/About" className={HeaderCSS['Nav-Link']}>About</NavLink>
                        <NavLink to="/Contact" className={HeaderCSS['Nav-Link']}>Contact</NavLink>
                        <NavLink to="/Blog" className={HeaderCSS['Nav-Link']}>Blog</NavLink>
                    </div>
                    {/* <div className={HeaderCSS["Header-Nav-Right"]}>
                        <button>dark</button>
                        <button>NL</button>
                    </div> */}
                </nav>
            </header>
        </>
    );
}