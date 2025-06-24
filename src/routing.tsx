import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home.tsx"
import { Header } from "./components/Header.tsx"

export const Routing = () => {

    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>} />
            </Routes>
        </>
    )
}