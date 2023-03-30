import React, { useState } from "react";
import logo from "../pictures/logo/logo.svg";
import forgotpwdpic from "../pictures/photo/forgot-password.svg";
import {useNavigate} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifyInfo, notifyWarning } from "../utils/Toast";
import axios from "axios";


const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    if (!email) {
      notifyError("Please enter an email address.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/reset-password`,
      {email},
      config
    );
    if (data.lvl === 'warning') {
      notifyWarning(data.message);
      return;
    }
    notifyInfo(data.message);
  }
  
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] flex flex-col items-center h-[650px] justify-around">
        <div className="w-full">
          <img src={logo} alt="" className="w-[150px] md:mt-1 cursor-pointer" onClick={() => navigate("/login")}/>
        </div>
        <div className="flex flex-col items-center">
          <img src={forgotpwdpic} alt="" className="w-[250px] md:w-[280px]" />
          <p className="font-medium text-lg md:text-xl">Forgot your password?</p>
        </div>
        <p className="text-center text-gray-600 md:text-lg">
          Enter your email address below to reset your password.
        </p>
        <input type="text" className="border outline-none px-2 py-2 w-[90%] rounded-md  md:text-lg max-w-[600px]" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
        <button className="bg-[#E25247] hover:bg-[#f05348] rounded-md text-white px-4 py-1 font-medium  md:text-lg" onClick={resetPassword}>Reset Password</button>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default ForgotPasswordPage;
