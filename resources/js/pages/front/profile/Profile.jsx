import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import usePageTitle from "../../title";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../../../features/profile/profileSlice";
import { toast } from "react-toastify";
import { SITE_API_URL } from "../../../constant";
import UserLayout from "../layouts/UserLayout";

const Profile = () => {
    usePageTitle("Profile");
    const {user,token}  = useSelector((state) => state.auth);
    const dispatch = useDispatch();
   
    const [validationErrors, setValidationErrors] = useState({});
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    });
    const user_id = user.id;
    useEffect(() => {

        const fetchData = async () => {
            const result = await dispatch(getProfileData(user_id)).unwrap();
            if (result) {
                setName(result.name);
                setUsername(result.username);
                setEmail(result.email);
            }
        };
        fetchData();
    }, [dispatch, user_id]);

    const handleProfileFormSubmit = async (e) => {
        e.preventDefault();
         const formData = { name, username, email };
    
        axios
        .post(`${SITE_API_URL}profile/update/${user.id}`, formData,{
              headers: {
                  Authorization: `Bearer ${token}`,
                },
        })
        .then((res) => {
            if (res.data.profile) {
                toast.success("Profile updated successfully!");
                setValidationErrors({});
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                setValidationErrors(error.response.data.errors);
            } else {
                toast.error("An error occurred while updating the profile.");
            }
        })
    };

    const handlePasswordFieldChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const hanldePasswordUpdateFormSubmit = async (e) => {
        e.preventDefault();
        axios
        .post(`${SITE_API_URL}profile/update/password/${user.id}`, passwordData,{
              headers: {
                  Authorization: `Bearer ${token}`,
                },
        })
        .then((res) => {
            if (res.data.password) {
                toast.success("Password updated successfully!");
                setValidationErrors({});
                setPasswordData({
                    current_password: "",
                    new_password: "",
                    confirm_new_password: "",
                });
            }
            if(res.data.password_incorrect){
                toast.error(res.data.password_incorrect);
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                setValidationErrors(error.response.data.errors);
            } else {
                toast.error("An error occurred while updating the password.");
            }
        })
    };
    return (
        <UserLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <NavLink to="/admin/dashboard">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="row">
                            <div className="col-lg-6">
                                <form onSubmit={handleProfileFormSubmit}>
                                    <div className="card">
                                        <div className="card-header bg-dark text-white py-2">
                                            <h5>General Information</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-2">
                                                <label htmlFor="name">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    defaultValue={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="form-control"
                                                    required
                                                />
                                               {validationErrors.name && <span className="text-danger">{validationErrors.name[0]}</span>}
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="username">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    defaultValue={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="form-control"
                                                    required
                                                />
                                                {validationErrors.username && (
                                                    <span className="text-danger">
                                                        {
                                                            validationErrors
                                                                .username[0]
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    defaultValue={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control"
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

                                            <div className="mb-2 text-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-sm btn-success"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6">
                                <form onSubmit={hanldePasswordUpdateFormSubmit}>
                                    <div className="card">
                                        <div className="card-header bg-dark text-white py-2">
                                            <h5>Update Password</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-2">
                                                <label htmlFor="name">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="current_password"
                                                    value={passwordData.current_password}
                                                    onChange={handlePasswordFieldChange}
                                                    className="form-control"
                                                    required
                                                />
                                               {validationErrors.current_password && <span className="text-danger">{validationErrors.current_password[0]}</span>}
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="username">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="new_password"
                                                    value={passwordData.new_password}
                                                    onChange={handlePasswordFieldChange}
                                                    className="form-control"
                                                    required
                                                />
                                                {validationErrors.new_password && (
                                                    <span className="text-danger">
                                                        {
                                                            validationErrors
                                                                .new_password[0]
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="email">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirm_new_password"
                                                    value={passwordData.confirm_new_password}
                                                    onChange={handlePasswordFieldChange}
                                                    className="form-control"
                                                    required
                                                />
                                                {validationErrors.confirm_new_password && (
                                                    <span className="text-danger">
                                                        {
                                                            validationErrors
                                                                .confirm_new_password[0]
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mb-2 text-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-sm btn-success"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                </section>
            </main>
        </UserLayout>
    );
};

export default Profile;
