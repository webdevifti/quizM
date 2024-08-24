import React, { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { NavLink, useParams } from "react-router-dom";
import usePageTitle from "../../title";
import { useDispatch, useSelector } from "react-redux";
import { analyzQuiz } from "../../../features/quiz/quizSlice";
import moment from "moment";

const Analyz = () => {
    usePageTitle("Quiz Analysis");
    const dispatch = useDispatch();
    const { id } = useParams();
    const { quizes, isLoading, isError, error } = useSelector(
        (state) => state.quizes
    );

    useEffect(() => {
        dispatch(analyzQuiz(id));
    }, [dispatch]);

    const formatDate = (dateString) => {
        return moment(dateString).format('D-MMMM, YYYY h:mm a');
    }
    return (
        <AdminLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Quiz Analyz</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/admin/dashboard">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="breadcrumb-item">
                                    <NavLink to="/admin/quizes">Quizs</NavLink>
                                </li>
                                <li className="breadcrumb-item active">
                                    Quiz Analyz
                                </li>
                            </ol>
                        </nav>
                        <NavLink
                            className="btn btn-outline-primary btn-sm"
                            to="/admin/quizes"
                        >
                            Back
                        </NavLink>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            {isLoading && <h3>Loading...</h3>}
                            {!isLoading && isError && <h3>{error}</h3>}
                            {!isLoading &&
                                !isError &&
                                quizes &&
                                quizes.length === 0 && (
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h4>No one submitted the quiz.</h4>
                                        </div>
                                    </div>
                                )}
                            {!isLoading &&
                                !isError &&
                                quizes &&
                                quizes.length > 0 && (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Performer</th>
                                                <th>Scored</th>
                                                <th>Date & Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {quizes.map((item, index) => (
                                                <tr key={index}>
                                                    {item.user && (
                                                        <>
                                                            <td>
                                                                {item.user.name}
                                                                <br />
                                                                <small>@{item.user.username}</small>
                                                            </td>
                                                            <td>
                                                                {item.score}
                                                            </td>
                                                            <td>{formatDate(item.created_at)}</td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                        </div>
                    </div>
                </section>
            </main>
        </AdminLayout>
    );
};

export default Analyz;
