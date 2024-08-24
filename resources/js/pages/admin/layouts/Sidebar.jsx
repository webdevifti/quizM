import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink className="nav-link " to="/admin/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#quiz-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Quizes</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="quiz-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <NavLink to="/admin/quizes">
                <i className="bi bi-circle"></i>
                <span>Manage</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/quizes/create">
                <i className="bi bi-circle"></i>
                <span>Create</span>
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/admin/performers">
            <i className="bx bxs-user"></i>
            <span>Performers</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};
