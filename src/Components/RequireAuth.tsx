import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import { useEffect } from "react";
function RequiresAuth() {
  const isAuth = localStorage.getItem("isAuth");

  useEffect(() => {
    !isAuth && toast.warn("Login Required");
  }, [isAuth]);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export { RequiresAuth };
