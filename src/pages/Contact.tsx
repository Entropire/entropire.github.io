import ContactCSS from "../css/pages/Contact.module.css";
import Email_Icon from '../assets/icons/E-mail.png'
import Linkedin_Icon from '../assets/icons/Linkedin.png'

export const Contact = () => {
    return(
        <div className={ContactCSS.ContectPage}>
            <div className={ContactCSS.ContactForm}>
                <h2>Send a Message</h2>
                <label className={ContactCSS.InputLable}>
                    <span>Name</span>
                    <input className={ContactCSS.InputBox} type="text" />
                </label>
                <label className={ContactCSS.InputLable}>
                    <span>Email</span>
                    <input className={ContactCSS.InputBox} type="text" />
                </label>
                <label className={ContactCSS.InputLable}>
                    <span>Message</span>
                    <input className={ContactCSS.InputBox} type="text"/>
                </label>
                <button className={ContactCSS.SubmitButton} type="submit">Submit</button>
            </div>
            <div className={ContactCSS.ContactInfo}>
                <h2>Contact me</h2>
                <p>Email: qduijster14@gmail.com</p>
                <div className={ContactCSS.ContactIcons}>
                    <a href='mailto:qduyster14@gmail.com'><img src={Email_Icon} alt="E-mail" /></a>
                    <a href='https://www.linkedin.com/in/quinten-duijster-0b60a9318' target='blank'><img src={Linkedin_Icon} alt="Linkedin" /></a>
                </div>
            </div>
        </div>
    );
}