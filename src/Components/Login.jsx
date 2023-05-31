import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { state, dispatch } = useAuth();
  const { isAuth } = state;

  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const { userName, password } = userDetails;

  const correctLogin = () => {
    dispatch({
      type: "LOGIN",
      payload: userDetails,
    });
  };
  const navigate = useNavigate();

  const test = () => {
    console.log("clicked");
    navigate("/dashboard");
  };

  if (isAuth) {
    navigate("/dashboard");
  }

  useEffect(() => console.log("testAuth"), [isAuth]);

  return (
    <div className="flex justify-center items-center  bg-fixed    w-screen h-screen">
      <div
        className=" flex-row justify-center content-center w-80 xl:w-96 p-5 m-2   
    border-2 rounded-lg  shadow-xl border-[#9D94E2]"
      >
        <h1
          className=" text-3xl  font-semibold text-center mb-10"
          onClick={() => test()}
        >
          Login
        </h1>

        <div className="flex-row  justify-center items-center w-full p-1">
          <div className="">User Name:</div>
          <div>
            <input
              className="border-2 rounded  w-full p-1 "
              type="text"
              id="email-id"
              placeholder="UserName"
              name="userName"
              value={userName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex-col justify-center items-center w-full  p-1">
          <div className="">Password:</div>
          <div>
            <input
              className="border-2 rounded  w-full p-1 "
              type="password"
              id="password-id"
              placeholder="••••••••"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div
          className="mx-1 my-2 p-3 text-center bg-[#9D94E2] text-white  rounded-lg cursor-pointer"
          onClick={() => {
            userName && password
              ? correctLogin()
              : //   : toast.error("Please fill all the fields");
                alert("please fill all the fields");
          }}
        >
          Login
        </div>

        <div
          className="mx-1 my-2 p-3 text-center border-2 rounded-lg cursor-pointer"
          onClick={() =>
            setUserDetails({
              userName: "guest",
              password: "password",
            })
          }
        >
          Guest Login
        </div>
      </div>
    </div>
  );
}

export default Login;
