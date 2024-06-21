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
            <nav>
                
            </nav>
        </div>
    )
}