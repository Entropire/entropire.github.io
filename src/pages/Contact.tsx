import ContactCSS from "../css/pages/Contact.module.css";
import CV_Icon from '../assets/icons/CV.png'
import Email_Icon from '../assets/icons/E-mail.png'
import Linkedin_Icon from '../assets/icons/Linkedin.png'
import Github_Icon from '../assets/icons/Github.png'

export const Contact = () => {
    return(
        <>
        <div>
            <div>
                <label>
                    <span>Name</span>
                    <input type="text" />
                </label>
                <label>
                    <span>Email</span>
                    <input type="text" />
                </label>
                <label>
                    <span>Message</span>
                    <input type="text" />
                </label>
                <button>Send</button>
            </div>
            <div>
                <h2>Contact me</h2>
                <p>Email: qduijster14@gmail.com</p>
                    <a href=''><img src={CV_Icon} alt="CV" /></a>
                    <a href='mailto:qduyster14@gmail.com'><img src={Email_Icon} alt="E-mail" /></a>
                    <a href='https://www.linkedin.com/in/quinten-duijster-0b60a9318' target='blank'><img src={Linkedin_Icon} alt="Linkedin" /></a>
                    <a href='https://github.com/Entropire' target='blank'><img src={Github_Icon} alt="Github" /></a>
            </div>
        </div>
        </>
    );
}