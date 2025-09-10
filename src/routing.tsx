import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home.tsx"
import { Header } from "./components/Header.tsx"
import { Footer } from "./components/Footer.tsx"
import { About } from "./pages/About.tsx"
import { Contact } from "./pages/Contact.tsx"
import { NotFound } from "./pages/NotFound.tsx"
import { Projects } from "./pages/Projects.tsx"
import './css/Global.css'

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
                    <Route path={"*"} element={<NotFound/>} />
                </Routes>
            </main>
            <Footer/>
        </>
    )
}