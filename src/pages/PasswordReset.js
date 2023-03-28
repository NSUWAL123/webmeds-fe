import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import logo from "../pictures/logo/logo.svg";
import forgotpwdpic from "../pictures/photo/forgot-password.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifyInfo, notifyWarning } from "../utils/Toast";
import PageNotFound from "./PageNotFound";

const PasswordReset = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isToken, setIsToken] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }; 

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/user/getUserById/${params.userId}`,
        config
      );
      const isToken = await axios.get(
        `http://localhost:5000/user/findTokenInDB/${params.token}`,
        config
      );
      setName(data.name);       
      setIsToken(isToken.data.tokenInDB);
    })();
  }, []);

  const resetPassword = async () => {
    if (!password || !rePassword) {
      notifyError("Please enter password.");
      return;
    }
    if (password !== rePassword) {
      notifyError("Password does not match with re-typed password.");
      return;
    }

    const updatePassword = await axios.put(
      `http://localhost:5000/user/updatePassword`, 
      {userId: params.userId, password, token: params.token},
      config
    );

    navigate('/login')
  };


  return (
    <div>
      {isToken ? (
      <div className="w-full flex justify-center">
        <div className="w-[90%] flex flex-col items-center h-[600px] justify-around">
          <div className="w-full">
            <img
              src={logo}
              alt=""
              className="w-[150px] md:mt-1 cursor-pointer"
              onClick={() => navigate("/login")}
            />
          </div>
          <div className="flex flex-col items-center">
            <img src={forgotpwdpic} alt="" className="w-[250px] md:w-[280px]" />
            <p className="text-center font-medium text-lg md:text-xl">
              Hello, <span className="text-[#00B368]">{name.trim()}!</span>{" "}
              Please enter a new password to reset password.
            </p>
          </div>
          {/* <p className="text-center text-gray-600 md:text-lg">
            Enter your email address below to reset your password.
          </p> */}
          <div className="flex items-center w-[95%] justify-between max-w-[330px]">
            <p className="text-gray-600 md:text-lg font-medium">
              New Password:
            </p>
            <input
              type="text"
              className="outline-none border-[2px] rounded-md pl-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center w-[95%] justify-between max-w-[330px]">
            <p className="text-gray-600 md:text-lg font-medium">
              Re-Type Password:
            </p>
            <input
              type="text"
              className="outline-none border-[2px] rounded-md pl-2"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          {/* <input type="text" className="border outline-none px-2 py-2 w-[90%] rounded-md  md:text-lg max-w-[600px]" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/> */}
          <button
            className="bg-[#E25247] hover:bg-[#f05348] rounded-md text-white px-4 py-1 font-medium  md:text-lg"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          theme="colored"
        />
      </div>
      ) : ( 
        <div className="h-screen">
          <PageNotFound/>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
