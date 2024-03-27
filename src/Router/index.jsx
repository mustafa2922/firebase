import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/SignIn";
import Home from "../pages/Home";

const Router = ()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Signup/>} />
            <Route path="/register" element={<Signup/>} />
            <Route path="/login" element={<Signin/>} />            
            <Route path="/home" element={<Home/>} />            

        </Routes>
        </BrowserRouter>
    );
};

export default Router;