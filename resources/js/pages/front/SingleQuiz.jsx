import React, { useEffect, useState } from "react";
import UserLayout from "./layouts/UserLayout";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz, quizSubmit } from "../../features/front/quiz/frontQuizSlice";
import usePageTitle from "../title";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const SingleQuiz = () => {
    const [userAnswers, setUserAnswers] = useState({});
    usePageTitle("Quiz");
    const {  quizes, isLoading, isError, error } = useSelector(
        (state) => state.frontQuize
    );

    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector((state) => state.auth.user);
    const userID = user.id;
    useEffect(() => {
        dispatch(getQuiz({ id, userID }));
    }, [dispatch]);

    const handleAnswerChange = (questionId, optionId, isMultiple) => {
        setUserAnswers((prevAnswers) => {
            if (isMultiple) {
                const selectedOptions = prevAnswers[questionId] || [];
                if (selectedOptions.includes(optionId)) {
                    return {
                        ...prevAnswers,
                        [questionId]: selectedOptions.filter(
                            (id) => id !== optionId
                        ),
                    };
                } else {
                    return {
                        ...prevAnswers,
                        [questionId]: [...selectedOptions, optionId],
                    };
                }
            } else {
                return { ...prevAnswers, [questionId]: optionId };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            quiz_id: quizes.id,
            answers: Object.keys(userAnswers).map((questionId) => ({
                question_id: questionId,
                option_ids: Array.isArray(userAnswers[questionId])
                    ? userAnswers[questionId]
                    : [userAnswers[questionId]],
            })),
        };

        try {
            const result = await dispatch(
                quizSubmit({ formData, userID })
        
            ).unwrap();
            toast.success("Quiz submitted successfully!");
        } catch (error) {
            toast.error("Failed to save quiz:" + error.message);
        }
    };

    return (
        <UserLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Quiz</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/home">Quizes</NavLink>
                                </li>
                            </ol>
                        </nav>
                        <NavLink to="/home" className="btn btn-success btn-sm">
                            All Quizes
                        </NavLink>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        {quizes.score && (
                            <div className="card">
                                <div className="card-body text-center">
                                    <h4>
                                        You have completed this quiz.
                                    </h4>
                                    <h3>
                                        Scored: <strong>{quizes.score}</strong>
                                    </h3>
                                </div>
                            </div>
                        )}
                        {quizes.exists ? (
                            ''
                        ) : (
                            <>
                                {isLoading && <Skeleton count={4}/>}
                                {!isLoading && isError && <h3>{error}</h3>}
                                {!isLoading &&
                                    !isError &&
                                    quizes &&
                                    quizes.questions && (
                                        <form onSubmit={handleSubmit}>
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-header bg-dark text-white py-2">
                                                        <h4>{quizes.title}</h4>
                                                        <p>
                                                            {quizes.description}
                                                        </p>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            {quizes.questions.map(
                                                                (q, qi) => (
                                                                    <div
                                                                        className="col-lg-4 mb-2 mt-2"
                                                                        key={qi}
                                                                    >
                                                                        <strong className="quiz-question d-block">
                                                                            {
                                                                                q.question_text
                                                                            }
                                                                        </strong>
                                                                        <small>
                                                                            <b>
                                                                                {q.type ===
                                                                                "single_choice"
                                                                                    ? "Only single choice"
                                                                                    : "You can choose multiple."}
                                                                            </b>
                                                                        </small>
                                                                        <ul>
                                                                            {q.options &&
                                                                                q.options.map(
                                                                                    (
                                                                                        option,
                                                                                        oi
                                                                                    ) => (
                                                                                        <label
                                                                                            key={
                                                                                                option.id
                                                                                            }
                                                                                            className="label"
                                                                                            htmlFor={
                                                                                                option.id
                                                                                            }
                                                                                        >
                                                                                            <input
                                                                                                id={
                                                                                                    option.id
                                                                                                }
                                                                                                name={`answer_${q.id}`}
                                                                                                value={
                                                                                                    option.id
                                                                                                }
                                                                                                type={
                                                                                                    q.type ===
                                                                                                    "single_choice"
                                                                                                        ? "radio"
                                                                                                        : "checkbox"
                                                                                                }
                                                                                                className="checkbox-input"
                                                                                                checked={
                                                                                                    q.type ===
                                                                                                    "single_choice"
                                                                                                        ? userAnswers[
                                                                                                              q
                                                                                                                  .id
                                                                                                          ] ===
                                                                                                          option.id
                                                                                                        : (
                                                                                                              userAnswers[
                                                                                                                  q
                                                                                                                      .id
                                                                                                              ] ||
                                                                                                              []
                                                                                                          ).includes(
                                                                                                              option.id
                                                                                                          )
                                                                                                }
                                                                                                onChange={() =>
                                                                                                    handleAnswerChange(
                                                                                                        q.id,
                                                                                                        option.id,
                                                                                                        q.type ===
                                                                                                            "multiple_choice"
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                            <span className="checkbox"></span>
                                                                                            <span className="text">
                                                                                                {
                                                                                                    option.option_text
                                                                                                }
                                                                                            </span>
                                                                                        </label>
                                                                                    )
                                                                                )}
                                                                        </ul>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </UserLayout>
    );
};

export default SingleQuiz;
