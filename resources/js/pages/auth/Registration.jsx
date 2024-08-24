import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import usePageTitle from "../title";
import { SITE_API_URL } from "../../constant";

const Registration = () => {
    usePageTitle("Registration");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const formSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post(`${SITE_API_URL}register`, userData)
            .then((res) => {
                if (res.data.register) {
                    setUserData({
                        name: "",
                        email: "",
                        username: "",
                        password: "",
                    });
                    setValidationErrors({});
                    dispatch(login(res.data.data));
                    navigate("/home");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    setValidationErrors(error.response.data.errors);
                } else {
                    console.error("There was an error!", error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <a
                                        href="index.html"
                                        className="logo d-flex align-items-center w-auto"
                                    >
                                        <img src="assets/img/logo.png" alt="" />
                                        <span className="d-none d-lg-block">
                                            QuizM
                                        </span>
                                    </a>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">
                                                Create an Account
                                            </h5>
                                            <p className="text-center small">
                                                Enter your personal details to
                                                create account
                                            </p>
                                        </div>

                                        <form
                                            className="row g-3 needs-validation"
                                            method="POST"
                                            onSubmit={formSubmit}
                                        >
                                            <div className="col-12">
                                                <label
                                                    htmlFor="yourName"
                                                    className="form-label"
                                                >
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={userData.name}
                                                    onChange={handleChange}
                                                    disabled={loading}
                                                    className="form-control"
                                                    id="yourName"
                                                    required
                                                />
                                                {validationErrors.name && (
                                                    <span className="text-danger">
                                                        {
                                                            validationErrors
                                                                .name[0]
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <label
                                                    htmlFor="yourEmail"
                                                    className="form-label"
                                                >
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleChange}
                                                    disabled={loading}
                                                    className="form-control"
                                                    id="yourEmail"
                                                    required
                                                />
                                                {validationErrors.email && (
                                                    <span className="text-danger">
                                                        {
                                                            validationErrors
                                                                .email[0]
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <label
                                                    htmlFor="yourUsername"
                                                    className="form-label"
                                                >
                                                    Username
                                                </label>
                                                <div className="input-group has-validation">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={
                                                            userData.username
                                                        }
                                                        onChange={handleChange}
                                                        disabled={loading}
                                                        className="form-control"
                                                        id="yourUsername"
                                                        required
                                                    />
                                                </div>
                                                {validationErrors.username && (
                                                    <span className="text-danger">
                                                        {
                                                            validationErrors
                                                                .username[0]
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <label
                                                    htmlFor="yourPassword"
                                                    className="form-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={userData.password}
                                                    onChange={handleChange}
                                                    disabled={loading}
                                                    className="form-control"
                                                    id="yourPassword"
                                                    required
                                                />
                                                {validationErrors.password && (
                                                    <span className="text-danger">
                                                        {
                                                            validationErrors
                                                                .password[0]
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-primary w-100"
                                                    type="submit"
                                                >
                                                    {loading
                                                        ? "Creating..."
                                                        : "Register"}
                                                </button>
                                            </div>
                                            <div className="col-12">
                                                <p className="small mb-0">
                                                    Already have an account?{" "}
                                                    <NavLink to="/">
                                                        Log in
                                                    </NavLink>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Registration;
