import React from "react";
import logo from "../pictures/logo/logo.svg";
import forgotpwdpic from "../pictures/photo/forgot-password.svg";
import {useNavigate} from "react-router-dom"

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
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
        <input type="text" className="border outline-none px-2 py-2 w-[90%] rounded-md  md:text-lg max-w-[600px]" placeholder="Email Address"/>
        <button className="bg-[#E25247] hover:bg-[#f05348] rounded-md text-white px-4 py-1 font-medium  md:text-lg">Reset Password</button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
