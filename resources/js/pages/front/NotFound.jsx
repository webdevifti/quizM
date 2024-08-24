import React from "react";
import { NavLink } from "react-router-dom";
import usePageTitle from "../title";

const NotFound = () => {
  usePageTitle('Page not Found')
  return (
    <main>
      <div class="container">
        <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          <NavLink class="btn btn-secoundary" to="/home">
            Back to home
          </NavLink>
       
        </section>
      </div>
    </main>
  );
};

export default NotFound;
