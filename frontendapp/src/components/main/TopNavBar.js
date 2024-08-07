import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../../css/TopNavBar.css'

export default function TopNavbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const navRef = useRef(null);

    const toggleNav = (event) => {
        event.stopPropagation();
        setIsNavVisible(!isNavVisible);
    }

    const closeNav = () => {
        setIsNavVisible(false);
    }

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            closeNav();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed-top app-header">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <Link className="app-logo-centered" to='/'>Bullinger FoS</Link>
                    <div className="col-2">
                        <Link className="app-logo" to='/'>Bullinger FoS</Link>
                    </div>
                    <div className="col-10">
                        <nav ref={navRef} className={`nav ${isNavVisible ? 'nav-visible' : ''}`}>
                            <ul className="nav-list">
                                <li className="nav-item"><Link to="/" onClick={closeNav}>Home</Link></li>
                                <li className="nav-item"><Link to="/about" onClick={closeNav}>About</Link></li>
                                <li className="nav-item sql-button">Import Data</li>
                                <li className="nav-item sql-button">Export Data</li>
                            </ul>

                            {/* <div className="search-bar">
                                <input type="text" className="search-input" placeholder="Search..." />
                                <button className="search-button">Search</button>
                            </div> */}
                            
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