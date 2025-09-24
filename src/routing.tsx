import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home.tsx"
import { Header } from "./components/Header.tsx"
import { Footer } from "./components/Footer.tsx"
import { About } from "./pages/about.tsx"
import { Contact } from "./pages/contact.tsx"
import { NotFound } from "./pages/notFound.tsx"
import { Projects } from "./pages/projects.tsx"
import { Project } from "./pages/project.tsx"
import './styles/Global.css'

export const Routing = () => {

    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/projects"} element={<Projects/>} />
                    <Route path={"/about"} element={<About/>} />
                    <Route path={"/contact"} element={<Contact/>} />
                    <Route path={"/projects/*"} element={<Project/>} />
                    <Route path={"*"} element={<NotFound/>} />
                </Routes>
            </main>
            <Footer/>
        </>
    )
}