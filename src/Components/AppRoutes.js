import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";

const AppRoutes = () => {
    return (
        render (
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/' element={<Login />}/>
                </Routes>
            </BrowserRouter>,
            document.getElementById("root")
        )
    );
}

export default AppRoutes