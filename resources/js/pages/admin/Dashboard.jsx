import React, { useEffect } from "react";
import AdminLayout from "./layouts/AdminLayout";
import usePageTitle from "../title";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../features/dashboard/dashboardSlice";
import { getLeaderboards } from "../../features/front/leaderboard/leaderboardSlice";
import Skeleton from "react-loading-skeleton";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { dashboard, isLoading, isError, error } = useSelector(
        (state) => state.dashboard
    );
    const { leaderboards } = useSelector((state) => state.leaderboards);
    usePageTitle("Admin Dashboard");
    useEffect(() => {
        dispatch(getDashboardData());
        dispatch(getLeaderboards());
    }, [dispatch]);
    return (
        <AdminLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                                Dashboard
                            </li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    {isLoading ? (
                        <Skeleton count={8} />
                    ) : (
                        <div>
                            <div className="row">
                                <div className="col-lg-12">
                                    {isLoading && <h3>Loading...</h3>}
                                    {!isLoading && isError && <h3>{error}</h3>}
                                    {!isLoading && !isError && dashboard && (
                                        <div className="row">
                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            Total Quizes
                                                        </h5>

                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i className="bi bi-menu-button-wide"></i>
                                                            </div>
                                                            <div className="ps-3">
                                                                <h6>
                                                                    {
                                                                        dashboard.quiz_count
                                                                    }
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            Total Performer
                                                        </h5>

                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i className="bx bxs-user"></i>
                                                            </div>
                                                            <div className="ps-3">
                                                                <h6>
                                                                    {
                                                                        dashboard.performer_count
                                                                    }
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {dashboard.top_performer && (
                                                <div className="col-xxl-4 col-md-6">
                                                    <div className="card info-card sales-card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                Top Performer
                                                            </h5>

                                                            <div className="d-flex align-items-center">
                                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                    <strong>
                                                                        {
                                                                            dashboard
                                                                                .top_performer
                                                                                .total_score
                                                                        }
                                                                    </strong>
                                                                </div>
                                                                <div className="ps-3">
                                                                    <h6>
                                                                        {
                                                                            dashboard
                                                                                .top_performer
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <h4>Leaderboard</h4>
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
                                                    leaderboards.length ===
                                                        0 && (
                                                        <tr>
                                                            <td>
                                                                No Data
                                                                Available.
                                                            </td>
                                                        </tr>
                                                    )}
                                                {leaderboards.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {item.user.name}{" "}
                                                                <br />{" "}
                                                                <small>
                                                                    @
                                                                    {
                                                                        item
                                                                            .user
                                                                            .username
                                                                    }
                                                                </small>
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.quizzes
                                                                        .length
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.total_score
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        ) : (
                                            ""
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </AdminLayout>
    );
};

export default Dashboard;
