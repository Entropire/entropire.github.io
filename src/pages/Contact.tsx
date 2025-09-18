import ContactCSS from "../css/pages/Contact.module.css";
import Email_Icon from '../assets/icons/E-mail.png'
import Linkedin_Icon from '../assets/icons/Linkedin.png'
import Discord_Icon from '../assets/icons/Discord.svg'

export const Contact = () => {
    return(
        <div className={ContactCSS.ContectPage}>
            <h2>Contact me</h2>
            <div className={ContactCSS.ContactMethods}>
                <div className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImage} src={Discord_Icon} alt="Discord Logo" />
                    <div className={ContactCSS.ContactMethodText}>
                        <b>Discord</b>
                        <p>Join my discord server</p>
                        <a href="https://discord.gg/AwA7mXV8qb">Join</a>
                    </div>
                </div>
                <div className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImage} src={Email_Icon} alt="E-Mail Logo" />
                    <div className={ContactCSS.ContactMethodText}>
                        <b>E-Mail</b>
                        <p>Email me on qduyster14@gmail.com</p>
                        <a href="">Send E-Mail</a>
                    </div>
                </div>
                <div className={ContactCSS.ContactMethod}>
                    <img className={ContactCSS.ContactMethodImage} src={Linkedin_Icon} alt="LinkedIn Logo" />
                    <div className={ContactCSS.ContactMethodText}>
                        <b>LinkedIn</b>
                        <p>Send me a message on LinkedIn</p>
                        <a href="">Connect</a>
                    </div>
                </div>
            </div>
        </div>
    );
}