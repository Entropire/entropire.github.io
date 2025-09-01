import ProfilePic from '../assets/Profile_Picture.png';
import AboutCSS from '../css/pages/About.module.css'

export const About = () => {
    return(
        <div className={AboutCSS.AboutPage}>  
            <img src={ProfilePic} alt='A picture of me' className={AboutCSS.ProfilePicture}/>
            <div>
                <h1>About Me</h1>
                <p>Hi, my name is Quinten, a 19-year-old software/game developer that lives in the Netherlands. I’m currently learning game development and enjoy building complex backend systems in games. When I’m not programming, I like to play games, spend time with friends and practice archery. One of my favorite things is spending a day shooting archery in the mountains of Austria, surrounded by nature and incredible views and enjoying the peace and quiet. </p>
            </div>
        </div>
    );
}