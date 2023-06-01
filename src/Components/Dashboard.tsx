import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import { TodoListContainer } from "./TodoListContainer";

function Dashboard() {
  const { dispatch } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="flex flex-col w-full h-screen ">
      <div className="p-4 flex items-center justify-between bg-[#9D94E2] text-white">
        <p>TODO App</p>
        <button onClick={() => handleLogout()}>LOGOUT</button>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="font-bold text-xl">Dashboard</div>
      </div>
      <TodoListContainer />
    </div>
  );
}

export default Dashboard;
