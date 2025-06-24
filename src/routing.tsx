import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home.tsx"

export const Routing = () => {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>} />
            </Routes>
        </>
    )
}