import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink className="nav-link " to="/home">
            <i className="bi bi-menu-button-wide"></i>
            <span>Quizes</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link collapsed" to="/leaderboards">
            <i className="ri ri-award-fill"></i>
            <span>Leaderboard</span>
          </NavLink>
        </li>
       
      </ul>
    </aside>
  );
};
