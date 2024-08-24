import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editQuiz, updateQuiz } from "../../../features/quiz/quizSlice";
import { toast } from "react-toastify";
import usePageTitle from "../../title";

const Edit = () => {
    usePageTitle("Edit Quiz");
    const param = useParams();
    const dispatch = useDispatch();
    const { quizes, isLoading } = useSelector((state) => state.quizes);
    const addMoreQuestionButtonRef = useRef(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
        {
            title: "",
            type: "single_choice",
            options: [{ option_text: "", is_correct: false }],
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await dispatch(editQuiz(param.id)).unwrap();
            if (result) {
                setTitle(result.title);
                setDescription(result.description);
                setQuestions(result.questions || []);
            }
        };
        fetchData();
    }, [dispatch, param.id]);

    const handleQuestionChange = (id, newText) => {
        const updatedQuestions = questions.map(question => {
            if (question.id === id) {
                return { ...question, question_text: newText };
            }
            
            return question;
        });
        setQuestions(updatedQuestions);
    };
    const handleQuestionTypeChange = (id, newText) => {
        const updatedQuestions = questions.map(question => {
            if (question.id === id) {
                return { ...question, type: newText };
            }
            
            return question;
        });
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, event) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, index) =>
                index === qIndex
                    ? {
                          ...question,
                          options: question.options.map((option, optIndex) =>
                              optIndex === oIndex
                                  ? {
                                        ...option,
                                        option_text: event.target.value,
                                    }
                                  : option
                          ),
                      }
                    : question
            )
        );
    };

    const handleCheckboxChange = (qIndex, oIndex, event) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, index) =>
                index === qIndex
                    ? {
                          ...question,
                          options: question.options.map((option, optIndex) =>
                              optIndex === oIndex
                                  ? {
                                        ...option,
                                        is_correct: event.target.checked,
                                    }
                                  : option
                          ),
                      }
                    : question
            )
        );
    };

    const addOption = (qIndex) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, index) =>
                index === qIndex
                    ? {
                          ...question,
                          options: [
                              ...question.options,
                              { option_text: "", is_correct: false },
                          ],
                      }
                    : question
            )
        );
    };

    const removeOption = (qIndex, oIndex) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, index) =>
                index === qIndex
                    ? {
                          ...question,
                          options: question.options.filter(
                              (_, optIndex) => optIndex !== oIndex
                          ),
                      }
                    : question
            )
        );
    };

    const addMoreQuestion = () => {
        setQuestions([
            ...questions,
            {
                question_text: "",
                type: "single_choice",
                options: [{ option_text: "", is_correct: false }],
            },
        ]);
        setTimeout(() => {
            if (addMoreQuestionButtonRef.current) {
                addMoreQuestionButtonRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }, 0);
    };

    const removeQuestion = (qIndex) => {
        setQuestions(questions.filter((_, i) => i !== qIndex));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            title,
            description,
            questions,
        };
        const id = param.id;
        try {
            await dispatch(updateQuiz({formData, id})).unwrap();
            toast.success("Quiz updated successfully!");
        } catch (error) {
            toast.error("Failed to update quiz: " + error.message);
        }
    };
    return (
        <AdminLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Quiz Edit</h1>
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
                                    Quiz Edit
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
                        {isLoading ? (
                            <h3>Loading..</h3>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={title}
                                                onChange={(e) =>
                                                    setTitle(
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Description</label>
                                            <textarea
                                                name="description"
                                                className="form-control"
                                                defaultValue={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                {questions.map((question, qIndex) => (
                                    <div className="card mb-3" key={qIndex}>
                                        <div className="card-header bg-dark text-white py-2 d-flex justify-content-between">
                                            <h6>Question {qIndex + 1}</h6>
                                            {qIndex > 0 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeQuestion(qIndex)
                                                    }
                                                >
                                                    Remove Question
                                                </button>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-2">
                                                <label>Question Title</label>
                                                <input
                                                    type="text"
                                                    name="question_text"
                                                    className="form-control"
                                                    defaultValue={
                                                        question.question_text
                                                    }
                                                    required
                                                    onChange={(e) =>
                                                        handleQuestionChange(
                                                            question.id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Type</label>
                                                <select
                                                    name="type"
                                                    className="form-control"
                                                    defaultValue={question.type}
                                                    onChange={(e) =>
                                                        handleQuestionTypeChange(
                                                            question.id,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option defaultValue="single_choice">
                                                        Single Choice
                                                    </option>
                                                    <option defaultValue="multiple_choice">
                                                        Multiple Choice
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label>
                                                    Answer Options, Select the
                                                    Correct Answers
                                                </label>
                                                <div>
                                                    {question.options.map(
                                                        (option, oIndex) => (
                                                            <div
                                                                className="d-flex align-items-center gap-2"
                                                                key={oIndex}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        option.is_correct
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCheckboxChange(
                                                                            qIndex,
                                                                            oIndex,
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder={`Option ${
                                                                        oIndex +
                                                                        1
                                                                    }`}
                                                                    className="form-control"
                                                                    defaultValue={
                                                                        option.option_text
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleOptionChange(
                                                                            qIndex,
                                                                            oIndex,
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                                {oIndex > 0 && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() =>
                                                                            removeOption(
                                                                                qIndex,
                                                                                oIndex
                                                                            )
                                                                        }
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                    <br />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addOption(qIndex)
                                                        }
                                                        className="btn btn-sm btn-outline-success"
                                                    >
                                                        Add Option
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    className="btn btn-success m-2"
                                >
                                    Save All
                                </button>
                                <button
                                    type="button"
                                    onClick={addMoreQuestion}
                                    className="btn btn-primary"
                                    ref={addMoreQuestionButtonRef}
                                >
                                    Add Another Question
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </main>
        </AdminLayout>
    );
};

export default Edit;
