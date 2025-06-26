import '../css/components/Footer.css'

export const Footer = () => {
    return(
        <>
            <footer className='Footer'>
                <p className='Footer-Left'>© {new Date().getFullYear()} Quinten Duijster - All rights reserved</p>
                <nav className='Footer-Right'>
                    <a href=''><img src="./icons/CV.png" alt="CV" /></a>
                    <a href='mailto:qduyster14@gmail.com'><img src="./icons/E-mail.png" alt="E-mail" /></a>
                    <a href='https://www.linkedin.com/in/quinten-duijster-0b60a9318' target='blank'><img src="./icons/Linkedin.png" alt="Linkedin" /></a>
                    <a href='https://github.com/Entropire' target='blank'><img src="./icons/Github.png" alt="Github" /></a>
                </nav>
            </footer>
        </>
    );
}