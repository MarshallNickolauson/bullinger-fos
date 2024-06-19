import React from "react";
import { Link } from "react-router-dom";

export default function SideNavbar({ data }) {

  const sortedDefinitionData = [...data].sort((a, b) => {
    if (a.figure_name < b.figure_name) {
      return -1;
    }
    if (a.figure_name > b.figure_name) {
      return 1;
    }
    return 0;
  });

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="fixed-side pt-5 mt-3 side-navbar">
      <nav className="nav flex-column">
        <Link to='/introduction' className="book-section-link">Introduction</Link>
        {sortedDefinitionData.map((item, index) => (
          <Link to={`/figures/${item.id}`} className="book-section-link" key={index}>{capitalizeFirstLetter(item.figure_name)}</Link>
        ))}
      </nav>
    </div>
  );
}