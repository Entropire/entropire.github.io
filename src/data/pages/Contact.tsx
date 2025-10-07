import ContactCSS from "../styles/pages/Contact.module.css";

export const Contact = () => {
    return(
        <div className={ContactCSS.ContectPage}>
            <h2>Contact me</h2>
            <div className={ContactCSS.ContactMethods}>
                <a href="https://discord.gg/AwA7mXV8qb" className={ContactCSS.ContactMethod}>
                    <svg className={ContactCSS.ContactMethodImg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.94 28" width="50" height="50">
                        <path d="M23.67,0c-.36.64-.69,1.3-.98,1.98-2.8-.42-5.65-.42-8.46,0-.29-.68-.62-1.34-.98-1.98-2.63.45-5.19,1.24-7.62,2.35C.81,9.49-.49,16.44.15,23.3c2.82,2.08,5.98,3.68,9.35,4.69.76-1.02,1.43-2.1,2-3.23-1.09-.41-2.14-.91-3.15-1.5.27-.19.52-.39.77-.58,5.92,2.78,12.77,2.78,18.69,0,.25.21.51.41.77.58-1.01.6-2.06,1.1-3.16,1.51.57,1.13,1.24,2.21,2,3.23,3.37-1.02,6.53-2.6,9.35-4.69.77-7.96-1.31-14.85-5.49-20.96C28.87,1.24,26.31.46,23.68.01h0ZM12.33,19.08c-1.82,0-3.33-1.65-3.33-3.69s1.45-3.7,3.32-3.7,3.36,1.66,3.33,3.7c-.03,2.03-1.47,3.69-3.32,3.69ZM24.6,19.08c-1.83,0-3.32-1.65-3.32-3.69s1.45-3.7,3.32-3.7,3.35,1.66,3.32,3.7c-.03,2.03-1.47,3.69-3.32,3.69Z" fill="currentColor"/>
                    </svg>
                    <div className={ContactCSS.ContactMethodText}>
                        <b>Discord</b>
                        <p>Join my discord server</p>
                    </div>
                </a>
                <a href="mailto:qduyster14@gmail.com" className={ContactCSS.ContactMethod}>
                    <svg className={ContactCSS.ContactMethodImg} xmlns="http://www.w3.org/2000/svg"  viewBox="0 -9.31 56.223 56.223" width="50" height="50">
                        <path d="M798.377,169.859h.012a2.16,2.16,0,0,0,1.181-.346l.092-.059.063-.039,1.071-.887,25.563-21.094a.3.3,0,0,0-.239-.123H770.492a.291.291,0,0,0-.183.066l26.745,22.045A2.1,2.1,0,0,0,798.377,169.859ZM770.2,150.3v31.268l19.159-15.476Zm37.084,15.9,19.139,15.38V150.4Zm-6.085,5.021a4.559,4.559,0,0,1-5.619.005l-4.388-3.619L770.2,184.558v.053a.3.3,0,0,0,.3.3h55.625a.3.3,0,0,0,.3-.3v-.049l-20.974-16.852Z" transform="translate(-770.195 -147.311)" fill="currentColor"/>
                    </svg>
                    <div className={ContactCSS.ContactMethodText}>
                        <b>E-Mail</b>
                        <p>Send me a E-Mail</p>
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/quinten-duijster-0b60a9318" className={ContactCSS.ContactMethod}>
                    <svg className={ContactCSS.ContactMethodImg} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="50" height="50">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill="currentColor" />
                    </svg>
                    <div className={ContactCSS.ContactMethodText}>
                        <b>LinkedIn</b>
                        <p>Connect with me on linkedin</p>
                    </div>
                </a>
            </div>
        </div>
    );
}