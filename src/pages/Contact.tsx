import ContactCSS from "../css/pages/Contact.module.css";
import Email_Icon from '../assets/icons/E-mail.png'
import Linkedin_Icon from '../assets/icons/Linkedin.png'
import Discord_Icon from '../assets/icons/Discord.svg'

export const Contact = () => {
    return(
        <div className={ContactCSS.ContectPage}>
            <h2>Contact me</h2>
            <div className={ContactCSS.ContactMethods}>
                <a href="https://discord.gg/AwA7mXV8qb" className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImage} src={Discord_Icon} alt="Discord Logo" />
                    <b>Discord</b>
                    <p>Join my discord server</p>
                </a>
                <a href="mailto:qduyster14@gmail.com" className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImage} src={Email_Icon} alt="E-Mail Logo" />
                    <b>E-Mail</b>
                    <p>Send me a E-Mail on qduyster14@gmail.com</p>
                </a>
                <a href="https://www.linkedin.com/in/quinten-duijster-0b60a9318" className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImage} src={Linkedin_Icon} alt="LinkedIn Logo" />
                    <b>LinkedIn</b>
                    <p>Connect with me on linkedin</p>
                </a>
            </div>
        </div>
    );
}