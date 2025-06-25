import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home.tsx"
import { Header } from "./components/Header.tsx"
import { Footer } from "./components/Footer.tsx"

export const Routing = () => {

    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                </Routes>
            </main>
            <Footer/>
        </>
    )
}