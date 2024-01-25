import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");
  const [isAuthentic, setIsAuthentic] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsAuthentic(true);
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  return isAuthentic ? <Outlet /> : navigate("/");
};

export default ProtectedRoute;
