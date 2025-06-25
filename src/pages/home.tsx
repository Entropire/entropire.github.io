import "../css/pages/Home.css";

export const Home = () => {
    return(
        <>
            <div className="Home-Page">
                <div className="Banner">
                    <div className="Banner-Text">
                        <h1>Quinten Duijster</h1>   
                        <h3>A energetic software/game developer</h3>     
                    </div>
                    <img className="Banner-Icon" src="./favicon.png" alt="profile picture" />
                </div>   
                <div className="Projects">
                    <div className="Projects-Nav">
                        <select name="Langauge" id="">
                            <option value="0" disabled selected hidden>Langauge</option>
                            <option value="1">c#</option>
                            <option value="2">C++</option>
                            <option value="3">Java</option>
                        </select>
                        <select name="Langauge" id="">
                            <option value="0" disabled selected hidden>Langauge</option>
                            <option value="1">c#</option>
                            <option value="2">C++</option>
                            <option value="3">Java</option>
                        </select>
                        <select name="Langauge" id="">
                            <option value="0" disabled selected hidden>Langauge</option>
                            <option value="1">c#</option>
                            <option value="2">C++</option>
                            <option value="3">Java</option>
                        </select>
                        <select name="Langauge" id="">
                            <option value="0" disabled selected hidden>Langauge</option>
                            <option value="1">c#</option>
                            <option value="2">C++</option>
                            <option value="3">Java</option>
                        </select>
                    </div>
                    <div className="Project-List">
                        <div className="Project-Cart">
                            <div className="Project-Cart-Text">
                                <h4>Title</h4>
                                <p>Here is a nice description of this project</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}