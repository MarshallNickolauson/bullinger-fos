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

  return (
    <div className="fixed-side pt-5">
      <nav className="nav flex-column bg-light">
        <Link to='/introduction' className="nav-link">Introduction</Link>
        {sortedDefinitionData.map((item, index) => (
          <Link to={`/figures/${item.id}`} className="nav-link" key={index}>{item.figure_name}</Link>
        ))}
      </nav>
    </div>
  );
}