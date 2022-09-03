import React from "react";
import "../style/navbar.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="web-name">
                <h1>Samsung Phones</h1>
            </div>

            <div className="home">
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} className="home-icon"></FontAwesomeIcon>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;