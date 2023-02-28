import React from "react";
import logo from "../pictures/logo/logo.svg";

const ForgotPasswordPage = () => {
  return (
    <div>
      <img src={logo} alt="" srcset="" />
      <p>Please enter of your email address:</p>
      <div>
        <input
          type="text"
          className="outline-none border border-gray-400 px-2 py-1 rounded-md"
        />
        <button className="bg-[#37474F] text-white font-medium px-4 py-1 rounded-md">
          Send
        </button>
      </div>
      <p>A link to reset your password will be sent to your email.</p>
    </div>
  );
};

export default ForgotPasswordPage;
