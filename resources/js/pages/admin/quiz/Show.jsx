import React, { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showQuiz } from "../../../features/quiz/quizSlice";
import usePageTitle from "../../title";

const Show = () => {
    usePageTitle("Quiz Details");
    const dispatch = useDispatch();
    const param = useParams();
    const { quizes, isLoading, isError, error } = useSelector(
        (state) => state.quizes
    );

    useEffect(() => {
        dispatch(showQuiz(param.id));
    }, [dispatch, param.id]);
    if (isLoading || !quizes || !quizes.questions) {
        return <div>Loading...</div>;
    }
    return (
        <AdminLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Quiz Detail</h1>
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
                                    Quiz Detail
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
                        {isLoading && <h3>Loading...</h3>}
                        {!isLoading && isError && <h3>{error}</h3>}

                        {!isLoading && !isError ? (
                            <div className="card">
                                <div className="card-header bg-dark text-white py-2">
                                    <h4>{quizes.title}</h4>
                                    <p>{quizes.description}</p>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {quizes.questions.map((q, qi) => (
                                            <div className="col-lg-4" key={qi}>
                                                <h4 className="quiz-question">
                                                    {q.question_text}
                                                </h4>
                                                <strong>Type: {q.type}</strong>
                                               
                                                <ul className="quiz-option">
                                                    {q.options &&
                                                        q.options.map(
                                                            (option, oi) => (
                                                                <li
                                                                    className="quiz-single-option"
                                                                    key={oi}
                                                                >
                                                                    {option.is_correct == 1 ? (<b className="text-success">Correct: </b>):''}
                                                                    {
                                                                        option.option_text
                                                                    }
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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

export default Show;
