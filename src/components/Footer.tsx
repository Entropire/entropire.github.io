import '../css/components/footer.css'

export const Footer = () => {
    return(
        <>
            <footer className='Footer'>
                <p className='Footer-Left'>© {new Date().getFullYear()} Quinten Duijsyer - All rights reserved</p>
                <nav className='Footer-Right'>
                    <a href=''><img src="./icons/CV.png" alt="CV" /></a>
                    <a href=''><img src="./icons/E-mail.png" alt="E-mail" /></a>
                    <a href=''><img src="./icons/Linkedin.png" alt="Linkedin" /></a>
                    <a href=''><img src="./icons/Github.png" alt="Github" /></a>
                </nav>
            </footer>
        </>
    );
}