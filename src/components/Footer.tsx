import FooterCSS from '../styles/components/Footer.module.css'
import CV_Icon from '../assets/icons/CV.png'
import Email_Icon from '../assets/icons/E-mail.png'
import Linkedin_Icon from '../assets/icons/Linkedin.png'
import Github_Icon from '../assets/icons/Github.png'

export const Footer = () => {
    return(
        <>
            <footer className={FooterCSS.Footer}>
                <p className={FooterCSS["Footer-Left"]}>© {new Date().getFullYear()} Quinten Duijster - All rights reserved</p>
                <nav className={FooterCSS["Footer-Right"]}>
                    <a href=''><img src={CV_Icon} alt="CV" /></a>
                    <a href='mailto:qduyster14@gmail.com'><img src={Email_Icon} alt="E-mail" /></a>
                    <a href='https://www.linkedin.com/in/quinten-duijster-0b60a9318' target='blank'><img src={Linkedin_Icon} alt="Linkedin" /></a>
                    <a href='https://github.com/Entropire' target='blank'><img src={Github_Icon} alt="Github" /></a>
                </nav>
            </footer>
        </>
    );
}