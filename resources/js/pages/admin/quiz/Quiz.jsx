import React, { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, fetchQuizes } from "../../../features/quiz/quizSlice";
import { toast } from "react-toastify";
import usePageTitle from "../../title";
import Skeleton from "react-loading-skeleton";
const Quiz = () => {
    usePageTitle("All Quizes");
    const { quizes, isLoading, isError, error } = useSelector(
        (state) => state.quizes
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchQuizes());
    }, [dispatch]);
    
    const handleDelete = async (id) => {
        try {
            const result = await dispatch(deleteQuiz(id)).unwrap();
           
            toast.success("Quiz has been deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete quiz: ");
        }
    };

    return (
        <AdminLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Quiz</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/admin/dashboard">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="breadcrumb-item active">Quiz</li>
                            </ol>
                        </nav>
                        <NavLink
                            className="btn btn-outline-primary btn-sm"
                            to="/admin/quizes/create"
                        >
                            Create
                        </NavLink>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        {isLoading && (<Skeleton count={10}/>)}
                        {!isLoading && isError && (<h3>{error}</h3>)}
                        {!isLoading && !isError && quizes && quizes.length === 0 && (<h3>No Quiz Available.</h3>)}
                        {!isLoading && !isError && quizes && quizes.length > 0 ? (
                            <div>
                                {quizes.map((q) => (
                                    <div className="card mb-2" key={q.id}>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <h5>{q.title}</h5>
                                                <div>
                                                    <NavLink
                                                        to={`/admin/quizes/analyz/${q.id}`}
                                                        className="btn btn-outline-info btn-sm"
                                                    >
                                                        Analyz
                                                    </NavLink>
                                                    <NavLink
                                                        to={`/admin/quizes/edit/${q.id}`}
                                                        className="btn btn-outline-primary btn-sm"
                                                    >
                                                        Edit
                                                    </NavLink>
                                                    <NavLink
                                                        to={`/admin/quizes/show/${q.id}`}
                                                        className="btn btn-outline-success btn-sm"
                                                    >
                                                        View
                                                    </NavLink>
                                                    <button type="button"
                                                        onClick={() =>
                                                            handleDelete(q.id)
                                                        }
                                                        className="btn btn-outline-danger btn-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </section>
            </main>
        </AdminLayout>
    );
};

export default Quiz;
