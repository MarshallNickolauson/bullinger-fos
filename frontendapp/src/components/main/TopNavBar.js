import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../css/TopNavBar.css'

export default function TopNavbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNav = () => {
      setIsNavVisible(!isNavVisible);
    }

    return (
        <header className="fixed-top app-header">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-2">
                        <Link className="app-logo" to='/'>Bullinger FoS</Link>
                    </div>
                    <div className="col-10">
                        <nav className={`nav ${isNavVisible ? 'nav-visible' : ''}`}>
                            <ul className="nav-list">
                                <li className="nav-item"><Link to="/">Home</Link></li>
                                <li className="nav-item"><Link to="/about">About</Link></li>
                            </ul>
                            <div className="search-bar">
                                <input type="text" className="search-input" placeholder="Search..." />
                                <button className="search-button">Search</button>
                            </div>                        
                        </nav>
                        <button className="nav-toggle" onClick={toggleNav}>
                            &#9776;
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}