import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";

function Dashboard() {
  const { dispatch } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="flex flex-col">
      <div className="p-4 flex items-center justify-between bg-[#9D94E2] text-white">
        <p>TODO</p>
        <button onClick={() => handleLogout()}>LOGOUT</button>
      </div>
      <div>Dashboard</div>
    </div>
  );
}

export default Dashboard;
