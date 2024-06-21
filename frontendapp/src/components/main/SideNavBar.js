import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideNavbar({ data }) {

  const [bookSort, setBookSort] = useState(true);
  const location = useLocation();

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
    <nav className="side-navbar-container">
      <div className="fixed-side side-navbar">
        <div className="sticky-button-container">
          <button type="button" className="btn btn-outline-dark mx-1 mb-1" onClick={handleSortClick}>
            {bookSort ? 'Alphabetical' : 'Book Appearance'}
          </button>
        </div>
        <nav className="nav flex-column">
          <Link to='/introduction' className={`book-section-link ${isActiveLink(`/introduction`)}`}>Introduction</Link>
          {bookSort ? (
            <>
              {sortedDefinitionData.map((item, index) => (
                <Link to={`/figures/${item.id}`} className={`book-section-link ${isActiveLink(`/figures/${item.id}`)}`} key={index}>
                {capitalizeFirstLetter(item.figure_name)}
              </Link>
              ))}
            </>
          ) : (
            <>
              {data.map((item, index) => (
                <Link to={`/figures/${item.id}`} className={`book-section-link ${isActiveLink(`/figures/${item.id}`)}`} key={index}>
                {capitalizeFirstLetter(item.figure_name)}
              </Link>
              ))}
            </>
          )}
        </nav>
      </div>
    </nav>
  );
}
