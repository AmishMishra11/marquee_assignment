import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
function RequiresAuth() {
  const { state } = useAuth();
  const { isAuth } = state;

  useEffect(() => {
    !isAuth && alert("Login Required");
  }, [isAuth]);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export { RequiresAuth };
