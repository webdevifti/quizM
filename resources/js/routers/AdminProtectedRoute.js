import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    if (user.role !== "admin") {
        useEffect(() => {
            navigate(-1);
            return;
        }, []);
    } else {
        return children;
    }
};

export default AdminProtectedRoute;
