import React, { useEffect } from "react";
import UserLayout from "./layouts/UserLayout";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuizes } from "../../features/front/quiz/frontQuizSlice";
import usePageTitle from "../title";
import Skeleton from "react-loading-skeleton";


const Home = () => {
  usePageTitle('Home')
  const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch();
    const { quizes, isLoading, isError, error } = useSelector(
        (state) => state.frontQuize
    );
    const user_id = user.id;
    useEffect(() => {
        dispatch(getQuizes(user_id));
      }, [dispatch]);
     
    return (
        <UserLayout>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Quizes</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/home">Quizes</NavLink>
                                </li>
                            </ol>
                        </nav>
                        <NavLink
                            to="/leaderboards"
                            className="btn btn-success btn-sm"
                        >
                            Leaderboard
                        </NavLink>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            {isLoading && <Skeleton count={4}/>}
                            {!isLoading && isError && <h3>{error}</h3>}
                            {!isLoading && !isError && quizes && quizes.length === 0 && (
                                <h3>No Quiz Available.</h3>
                            )}
                            {!isLoading && !isError && quizes && quizes.length > 0 ? (
                                <div className="row">
                                    {quizes.map((q) => (
                                        <div className="col-xxl-3 col-md-6" key={q.id}>
                                            <NavLink to={`/quize/${q.id}`}>
                                                <div className="card info-card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                           {q.title}
                                                            <span>
                                                                {" "}
                                                                | Questions({q.questions.length})
                                                            </span>
                                                        </h5>
                                                        <span>
                                                            {q.user_score !== null && q.user_score !== undefined ? (
                                                                <>
                                                                <small style={{color: '#899bbd'}}>
                                                                Scored: <strong>{q.user_score}</strong> points
                                                                </small>
                                                                </>

                                                            ): (<button className="btn btn-outline-primary btn-sm d-block w-100">Start</button>)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
            </main>
        </UserLayout>
    );
};

export default Home;
