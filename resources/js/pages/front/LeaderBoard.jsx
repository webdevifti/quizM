import React, { useEffect } from "react";
import UserLayout from "./layouts/UserLayout";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboards } from "../../features/front/leaderboard/leaderboardSlice";
import usePageTitle from "../title";
import Skeleton from "react-loading-skeleton";

const LeaderBoard = () => {
    const dispatch = useDispatch();
    usePageTitle("Leaderboards");
    const { leaderboards, isLoading, isError, error } = useSelector(
        (state) => state.leaderboards
    );
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(getLeaderboards());
    }, [dispatch]);
    return (
        <UserLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Leaderboard</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/home">Quizes</NavLink>
                                </li>
                            </ol>
                        </nav>
                        <NavLink to="/home" className="btn btn-success btn-sm">
                            Quizes
                        </NavLink>
                    </div>
                </div>

                <section className="section dashboard">
                    {isLoading ? (
                        <Skeleton count={4} />
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Positions#</th>
                                            <th>Name/Username</th>
                                            <th>Quiz Attend</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    {!isLoading &&
                                    !isError &&
                                    leaderboards &&
                                    leaderboards.length > 0 ? (
                                        <tbody>
                                            {isLoading && (
                                                <tr>
                                                    <td>Loading...</td>
                                                </tr>
                                            )}
                                            {!isLoading &&
                                                !isError &&
                                                leaderboards &&
                                                leaderboards.length === 0 && (
                                                    <tr>
                                                        <td>
                                                            No Data Available.
                                                        </td>
                                                    </tr>
                                                )}
                                            {leaderboards.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {item.user.name} <br />{" "}
                                                        <small>
                                                            @
                                                            {item.user.username}
                                                        </small>
                                                        {item.user.username ===
                                                        user.username ? (
                                                            <small>
                                                                <span className="badge bg-success m-2">
                                                                    You
                                                                </span>
                                                            </small>
                                                        ) : null}
                                                    </td>
                                                    <td>
                                                        {item.quizzes.length}
                                                    </td>
                                                    <td>{item.total_score}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    ) : (
                                        ""
                                    )}
                                </table>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </UserLayout>
    );
};

export default LeaderBoard;
