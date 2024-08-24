import React, { useRef, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeQuiz } from "../../../features/quiz/quizSlice";
import { toast } from "react-toastify";
import usePageTitle from "../../title";

const Create = () => {
    usePageTitle("Create Quiz");
    const dispatch = useDispatch();
    const addMoreQuestionButtonRef = useRef(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
        {
            title: "",
            type: "single_choice",
            options: [{ text: "", isCorrect: false }],
        },
    ]);

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex].text = event.target.value;
        setQuestions(newQuestions);
    };

    const handleCheckboxChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex].isCorrect = event.target.checked;
        setQuestions(newQuestions);
    };

    const addOption = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.push({ text: "", isCorrect: false });
        setQuestions(newQuestions);
    };

    const removeOption = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options = newQuestions[qIndex].options.filter(
            (_, i) => i !== oIndex
        );
        setQuestions(newQuestions);
    };

    const addMoreQuestion = () => {
        setQuestions([
            ...questions,
            {
                title: "",
                type: "single_choice",
                options: [{ text: "", isCorrect: false }],
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
        try {
            const result = await dispatch(storeQuiz(formData)).unwrap();
            setTitle("");
            setDescription("");
            setQuestions([
                {
                    title: "",
                    type: "single_choice",
                    options: [{ text: "", isCorrect: false }],
                },
            ]);
            toast.success("Quiz saved successfully!");
        } catch (error) {
            toast.error("Failed to save quiz:"+ error.message);
        }
    };

    return (
        <AdminLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Quiz Create</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/admin/dashboard">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="breadcrumb-item"><NavLink to="/admin/quizes">Quizs</NavLink></li>
                                <li className="breadcrumb-item active">
                                    Quiz Create
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
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
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
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            {questions.map((question, qIndex) => (
                                <div className="card mb-3" key={qIndex}>
                                    <div className="card-header bg-dark text-white py-2 d-flex justify-content-between">
                                        <h6>Question {qIndex + 1}</h6>
                                        {qIndex > 0 ? (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    removeQuestion(qIndex)
                                                }
                                            >
                                                Remove Question
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <label>Question Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control"
                                                value={question.title}
                                                required
                                                onChange={(e) =>
                                                    handleQuestionChange(
                                                        qIndex,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Type</label>
                                            <select
                                                name="type"
                                                className="form-control"
                                                value={question.type}
                                                onChange={(e) =>
                                                    handleQuestionChange(
                                                        qIndex,
                                                        e
                                                    )
                                                }
                                            >
                                                <option value="single_choice">
                                                    Single Choice
                                                </option>
                                                <option value="multiple_choice">
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
                                                                    option.isCorrect
                                                                }
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(
                                                                        qIndex,
                                                                        oIndex,
                                                                        e
                                                                    )
                                                                }
                                                            />
                                                            <input
                                                                type="text"
                                                                required
                                                                placeholder={`Option ${
                                                                    oIndex + 1
                                                                }`}
                                                                className="form-control"
                                                                value={
                                                                    option.text
                                                                }
                                                                onChange={(e) =>
                                                                    handleOptionChange(
                                                                        qIndex,
                                                                        oIndex,
                                                                        e
                                                                    )
                                                                }
                                                            />
                                                            {oIndex > 0 ? (
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
                                                            ) : (
                                                                ""
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
                    </div>
                </section>
            </main>
        </AdminLayout>
    );
};

export default Create;
