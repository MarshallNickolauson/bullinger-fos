import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../css/TopNavBar.css'

export default function TopNavbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNav = () => {
      setIsNavVisible(!isNavVisible);
    }

    return (
        <div className="fixed-top top-navbar" >
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><strong>Bullinger FoS</strong></a>
                    <button className="nav-toggle" type="button" onClick={toggleNav}>
                        &#9776;
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Find</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}