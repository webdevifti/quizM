import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/front/NotFound";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import Home from "../pages/front/Home";
import ProtectedRoute from "./ProtectedRoute";
import Quiz from "../pages/admin/quiz/Quiz";
import QuizCreate from "../pages/admin/quiz/Create";
import QuizEdit from "../pages/admin/quiz/Edit";
import Analyz from "../pages/admin/quiz/Analyz";
import Show from "../pages/admin/quiz/Show";
import Performer from "../pages/admin/performer/Performer";
import SingleQuiz from "../pages/front/SingleQuiz";
import LeaderBoard from "../pages/front/LeaderBoard";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Profile from "../pages/front/profile/Profile";
import AdminProfile from "../pages/admin/profile/Profile";

const routeConfig = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<NotFound />} />
                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Registration />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/leaderboards"
                    element={
                        <ProtectedRoute>
                            <LeaderBoard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quize/:id"
                    element={
                        <ProtectedRoute>
                            <SingleQuiz />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <Dashboard />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/quizes"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <Quiz />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/quizes/create"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <QuizCreate />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/quizes/edit/:id"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <QuizEdit />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin/quizes/show/:id"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <Show />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/quizes/analyz/:id"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <Analyz />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/performers"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <Performer />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/profile"
                    element={
                        <ProtectedRoute>
                            <AdminProtectedRoute>
                                <AdminProfile />
                            </AdminProtectedRoute>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default routeConfig;
