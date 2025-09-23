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
                    <img className={ContactCSS.ContactMethodImg} src={Discord_Icon} alt="Discord Logo" />
                    <div className={ContactCSS.ContactMethodText}>
                        <b>Discord</b>
                        <p>Join my discord server</p>
                    </div>
                </a>
                <a href="mailto:qduyster14@gmail.com" className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImg} src={Email_Icon} alt="E-Mail Logo" />
                    <div className={ContactCSS.ContactMethodText}>
                        <b>E-Mail</b>
                        <p>Send me a E-Mail on qduyster14@gmail.com</p>
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/quinten-duijster-0b60a9318" className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImg} src={Linkedin_Icon} alt="LinkedIn Logo" />
                    <div className={ContactCSS.ContactMethodText}>
                        <b>LinkedIn</b>
                        <p>Connect with me on linkedin</p>
                    </div>
                </a>
            </div>
        </div>
    );
}