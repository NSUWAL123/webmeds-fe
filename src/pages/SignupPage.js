import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../pictures/icons/back.svg";
import logo from "../pictures/logo/logo.svg";
import signuppic from "../pictures/photo/signup.svg";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-display w-[100%] md:text-lg ">
      <div className="">
        <button className="flex items-center m-6 ">
          <img src={back} alt="" srcset="" />
          <p
            className="font-semibold text-[#7A7A7A] pl-2 "
            onClick={() => navigate("/")}
          >
            Back to Home
          </p>
        </button>
      </div>

      <div className="w-[100%]] flex justify-center mt-6 lg:mt-12">
        {/* cont */}
        <div className="w-[80%] flex flex-col items-center lg:w-[100%] xl:w lg:flex-row lg:h-[550px] lg:items-center lg:mr-[10%]">
          {/* lcont */}
          <div className="w-[100%] flex flex-col items-center">
            <img
              src={logo}
              alt=""
              srcset=""
              className="w-[190px] md:w-[240px] lg:hidden"
            />
            <img
              src={signuppic}
              alt=""
              className="w-[230px] md:w-[320px] lg:w-[420px] xl:w-[554px]"
            />
          </div>

          {/* right-cont */}
          <div className="text-xs w-[100%] sm:text-lg md:text-xl  xl:w-[70%] flex flex-col items-center lg:h-[80%] lg:justify-evenly">
            <img
              src={logo}
              alt=""
              srcset=""
              className="w-[190px] md:w-[240px] hidden lg:block mb-12 xl:w-[280px]"
            />
            <div className="w-[100%] ">
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Full Name: </p>
                <input
                  type="text"
                  className="w-[70%] outline-none rounded-3xl py-1 px-3 border-2"
                />
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Email: </p>
                <input
                  type="text"
                  className="w-[70%] outline-none rounded-3xl py-1 px-3 border-2"
                />
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Mobile: </p>
                <input
                  type="text"
                  className="w-[70%] outline-none rounded-3xl py-1 px-3 border-2"
                />
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Age: </p>
                <div className="w-[70%]">
                  <input
                    type="text"
                    className="w-[60px] outline-none rounded-3xl py-1 px-3 border-2"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Password: </p>
                <input
                  type="text"
                  className="w-[70%] outline-none rounded-3xl py-1 px-3 border-2"
                />
              </div>
              <div className="flex justify-between items-center mb-7">
                <p className="font-semibold">Confirm Pwd: </p>
                <input
                  type="text"
                  className="w-[70%] outline-none rounded-3xl py-1 px-3 border-2"
                />
              </div>
            </div>
            <button className="bg-[#E25247] text-white py-2 px-7 rounded-3xl font-semibold">
              Sign up
            </button>
            <div className="flex font-semibold my-5">
              <p className="text-[#7A7A7A] pr-2">Already have an account?</p>
              <button
                className="text-[#E25247]"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
