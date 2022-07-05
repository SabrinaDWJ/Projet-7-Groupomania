import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Actualite from "../../pages/Actualite";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";

const index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={Home} />
                <Route path="/profil" exact element={Profil} />
                <Route path="/actualite" exact element={Actualite} />
                <Navigate to="/" />
            </Routes>
        </Router>
    )
}

export default index;