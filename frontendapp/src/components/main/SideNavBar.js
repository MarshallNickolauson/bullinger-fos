import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../../css/SideNavBar.css'

export default function SideNavbar({ data }) {

  const [bookSort, setBookSort] = useState(true);
  const location = useLocation();
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

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortedDefinitionData = [...data].sort((a, b) => {
    if (a.figure_name < b.figure_name) {
      return -1;
    }
    if (a.figure_name > b.figure_name) {
      return 1;
    }
    return 0;
  });

  const handleSortClick = () => {
    setBookSort(!bookSort);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active-link' : '';
  }

  return (
    <>
      <button className="side-nav-toggle" onClick={toggleNav}>
        &#9776;
      </button>
      <nav ref={navRef} className={`side-navbar-container ${isNavVisible ? 'side-visible-1' : ''}`}>
        <div className={`fixed-side side-navbar ${isNavVisible ? 'side-visible-2' : ''}`}>
          <div className={`sticky-button-container ${isNavVisible ? 'side-visible-2' : ''}`}>
            <button type="button" className="btn-dark-blue mx-1 mb-1" onClick={handleSortClick}>
              {!bookSort ? 'Alphabetical' : 'Book Appearance'}
            </button>
          </div>
          <nav className={`${windowSize.width < 992 ? 'column-nav' : 'nav flex-column'}`}>
            <Link to='/introduction' className={`book-section-link ${isNavVisible ? 'side-visible-3' : ''} ${isActiveLink(`/introduction`)}`} onClick={scrollToTop}>Introduction</Link>
            {!bookSort ? (
              <>
                {sortedDefinitionData.map((item, index) => (
                  <Link to={`/figures/${item.id}`} className={`book-section-link ${isNavVisible ? 'side-visible-3' : ''} ${isActiveLink(`/figures/${item.id}`)}`} key={index} onClick={scrollToTop}>
                    {capitalizeFirstLetter(item.figure_name)}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {data.map((item, index) => (
                  <Link to={`/figures/${item.id}`} className={`book-section-link ${isNavVisible ? 'side-visible-3' : ''} ${isActiveLink(`/figures/${item.id}`)}`} key={index} onClick={scrollToTop}>
                    {capitalizeFirstLetter(item.figure_name)}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      </nav>
    </>
  );
}
