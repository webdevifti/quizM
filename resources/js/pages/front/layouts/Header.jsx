import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { SITE_API_URL } from "../../../constant";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const logoutHandle = (e) => {
      e.preventDefault()
        axios
            .post(`${SITE_API_URL}logout`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            .then((res) => {
                if (res.data.logout) {
                    dispatch(logout());
                    navigate("/");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    setValidationErrors(error.response.data.errors);
                } else {
                    console.error("There was an error!", error);
                }
            })
    };
    return (
        <header
            id="header"
            className="header fixed-top d-flex align-items-center"
        >
            <div className="d-flex align-items-center justify-content-between">
                <a href="index.html" className="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">QuizM</span>
                </a>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <div className="search-bar">
                <form
                    className="search-form d-flex align-items-center"
                    method="POST"
                    action="#"
                >
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        title="Enter search keyword"
                    />
                    <button type="submit" title="Search">
                        <i className="bi bi-search"></i>
                    </button>
                </form>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    

                    <li className="nav-item dropdown pe-3">
                        <a
                            className="nav-link nav-profile d-flex align-items-center pe-0"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                           
                            <span className="d-none d-md-block dropdown-toggle ps-2">
                                {user.name}
                            </span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{user.username}</h6>
                                <span>{user.role}</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <NavLink
                                    className="dropdown-item d-flex align-items-center"
                                    to="/profile"
                                >
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <form onSubmit={logoutHandle}>
                                <li>
                                    <button
                                        type="submit"
                                        className="dropdown-item d-flex align-items-center"
                                    >
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </button>
                                </li>
                            </form>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
