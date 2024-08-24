import React, { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deletePerformer,
    fetchPerformers,
} from "../../../features/performer/performerSlice";
import { toast } from "react-toastify";
import usePageTitle from "../../title";
import moment from "moment";

const Performer = () => {
    usePageTitle("Manage Performers");
    const dispatch = useDispatch();
    const { performers, isLoading, isError, error } = useSelector(
        (state) => state.performers
    );
    useEffect(() => {
        dispatch(fetchPerformers());
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            const result = await dispatch(deletePerformer(id)).unwrap();

            toast.success("Performer has been deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete: ");
        }
    };
    const formatDate = (dateString) => {
        return moment(dateString).format('D-MMMM, YYYY h:mm a');
    }
    return (
        <AdminLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Performer</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/admin/dashboard">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="breadcrumb-item active">
                                    Performer
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Joined</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {!isLoading && !isError && performers && performers.length > 0 ? (
                                <tbody>
                                    {isLoading && (
                                        <tr>
                                            <td>Loading...</td>
                                        </tr>
                                    )}
                                    {!isLoading &&
                                        !isError && performers &&
                                        performers.length === 0 && (
                                            <tr>
                                                <td>No One Available.</td>
                                            </tr>
                                        )}
                                    {performers.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>{formatDate(item.created_at)}</td>
                                            <td>
                                               
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={(e) =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                ""
                            )}
                        </table>
                    </div>
                </section>
            </main>
        </AdminLayout>
    );
};

export default Performer;
