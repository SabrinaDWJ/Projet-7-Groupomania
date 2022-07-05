import React from "react";
import Log from "../components/Log"

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container"></div>
            <Log signin={false} signup={true} />
            <div className="img-container"></div>
            <img src="" alt="" />
        </div>
    )
}

export default Profil;