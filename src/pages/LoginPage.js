import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../pictures/icons/back.svg";
import logo from "../pictures/logo/logo.svg";
import loginpic from "../pictures/photo/login.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-display w-screen  md:text-lg  ">
      <div className="">
        <button className="flex items-center m-6">
          <img src={back} alt="" srcset="" />
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
              srcset=""
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
              srcset=""
              className="w-[190px] md:w-[240px] hidden lg:block mb-12 xl:w-[280px]"
            />
            <div className="w-[100%] lg:text-xl">
              <div className="flex justify-between items-center mb-6 xl:mx-3 lg:mb-8">
                <p className="font-semibold">Email: </p>
                <input
                  type="text"
                  className="w-4/6 md:w-3/4 outline-none rounded-3xl py-1 px-3 border-2"
                />
              </div>
              <div className="flex justify-between items-center mb-7 xl:mx-3">
                <p className="font-semibold">Password: </p>
                <input
                  type="text"
                  className="w-4/6 md:w-3/4 outline-none rounded-3xl py-1 px-3 border-2"
                />
              </div>
            </div>
            <button className="bg-[#E25247] text-white py-2 px-7 rounded-3xl font-semibold">
              Login
            </button>
            <div className="flex font-semibold my-5">
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
    </div>
  );
};

export default LoginPage;
