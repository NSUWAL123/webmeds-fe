import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../pictures/icons/back.svg";
import logo from "../pictures/logo/logo.svg";
import loginpic from "../pictures/photo/login.svg";
import eyeopen from "../pictures/icons/eyeopen.svg";
import eyeclose from "../pictures/icons/eyeclose.svg";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifyInfo, notifySuccess } from "../utils/Toast"

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showPassHandler = () => {
    if (!showPass) {
      setShowPass(true);
    } else {
      setShowPass(false);
    }
  };

  const submitHandler = async () => {
    console.log(email, password);
    if (!email || !password) {
      console.log("empty fields");
      notifyError("Empty Fields");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        config
      );

      //toast message according to type
      if (data.lvl === "error") {
        notifyError(data.message);
        return;
      }
      if (data.lvl === "info") {
        notifyInfo(data.message);
        return;
      }
      if (data.lvl === "success") {
        notifySuccess(data.message);
        navigate('/')
        return;
      }
      console.log(data);
    } 
    catch (error) {
      console.log(error)
    }
  };

  
  return (
    <div className="font-display w-screen  md:text-lg  relative">
      <div className="">
        <button className="flex items-center m-6">
          <img src={back} alt="" />
          <p
            className="font-semibold text-[#7A7A7A]  pl-2"
            onClick={() => navigate("/")}
          >
            Back to Home
          </p>
        </button>
      </div>

      <div className="w-100% flex h-[80%] md:items-center justify-evenly mt-12 md:mt-0 ">
        {/* cont */}
        <div className="w-[85%] sm:w-[75%] md:w-[75%] flex flex-col items-center lg:w-[80%] lg:flex-row lg:h-[550px] lg:items-center ">
          {/* lcont */}
          <div className="w-[100%] flex flex-col items-center">
            <img
              src={logo}
              alt=""
              className="w-[190px] md:w-[240px] lg:hidden"
            />
            <img
              src={loginpic}
              alt=""
              className="w-[260px] md:w-[320px] lg:w-[554px]"
            />
          </div>

          {/* right-cont */}
          <div className="text-xs sm:text-lg md:text-xl w-[100%] flex flex-col items-center lg:h-[80%] lg:justify-evenly ">
            <img
              src={logo}
              alt=""
              className="w-[190px] md:w-[240px] hidden lg:block mb-12 xl:w-[280px]"
            />
            <div className="w-[100%] lg:text-xl">
              <div className="flex justify-between items-center mb-6 xl:mx-3 lg:mb-8">
                <p className="font-semibold">Email: </p>
                <input
                  type="email"
                  className="w-4/6 md:w-3/4 outline-none rounded-lg py-1 px-3 border-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mb-7 xl:mx-3">
                <p className="font-semibold">Password: </p>
                <div className="w-4/6 md:w-3/4 rounded-lg py-1 px-3 border-2 flex">
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-[90%] outline-none "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={showPass ? eyeopen : eyeclose}
                    alt=""
                    className="cursor-pointer"
                    onClick={showPassHandler}
                  />
                </div>
              </div>
            </div>
            <button
              className="bg-[#E25247] text-white py-2 px-7 rounded-lg font-semibold"
              onClick={submitHandler}
            >
              Login
            </button>

            <div className="flex font-semibold my-5 sm:text-[16px]">
              <p className="text-[#7A7A7A] pr-2">Don't have an account?</p>
              <button
                className="text-[#E25247]"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored"/>
    </div>
  );
};

export default LoginPage;
