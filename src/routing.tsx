import { useNavigate, Routes, Route } from "react-router-dom"
import { useEffect} from "react"
import { Home } from "./pages/Home.tsx"
import { Header } from "./components/Header.tsx"
import { Footer } from "./components/Footer.tsx"
import { About } from "./pages/About.tsx"
import { Contact } from "./pages/Contact.tsx"
import { NotFound } from "./pages/NotFound.tsx"
import { Projects } from "./pages/Projects.tsx"
import { Project } from "./pages/Project.tsx"
import { NotSupported } from "./pages/NotSupported.tsx"
import './styles/Global.css'

export const Routing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
      navigate("/notsupported");
    } else if (/tablet|ipad/.test(userAgent)) {
      navigate("/notsupported");
    }
  }, [navigate]);

    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/projects"} element={<Projects/>} />
                    <Route path={"/about"} element={<About/>} />
                    <Route path={"/contact"} element={<Contact/>} />
                    <Route path={"/projects/:projectName"} element={<Project/>} />
                    <Route path={"/notsupported"} element={<NotSupported/>} />
                    <Route path={"*"} element={<NotFound/>} />
                </Routes>
            </main>
            <Footer/>
        </>
    )
}