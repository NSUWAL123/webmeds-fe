import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../pictures/icons/back.svg";
import logo from "../pictures/logo/logo.svg";
import signuppic from "../pictures/photo/signup.svg";
import axios from "axios";
import eyeopen from "../pictures/icons/eyeopen.svg";
import eyeclose from "../pictures/icons/eyeclose.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifyInfo } from "../utils/Toast";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const showPassHandler = () => {
    if (!showPass) {
      setShowPass(true);
    } else {
      setShowPass(false);
    }
  };

  const showConfPassHandler = () => {
    if (!showConfPass) {
      setShowConfPass(true);
    } else {
      setShowConfPass(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if ((!name, !email, !mobile, !dob, !password)) {
      notifyError("Empty Fields");
      return;
    }

    if (password !== confirmPassword) {
      notifyError("Entered password are different.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/signup`,
        { name, email, mobile, dob, password },
        config
      );

      if (data.lvl === "error") {
        notifyError(data.message);
        return;
      }
      notifyInfo(
        "A verification link has been sent to your email. Please check your email."
      );
    } catch (error) {
    }
  };

  return (
    <div className="font-display w-[100%] md:text-lg ">
      <div className="">
        <button className="flex items-center m-6 ">
          <img src={back} alt="" />
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
              className="w-[190px] md:w-[240px] lg:hidden"
            />
            <img
              src={signuppic}
              alt=""
              className="w-[230px] md:w-[320px] lg:w-[420px] xl:w-[554px]"
            />
          </div>

          {/* right-cont */}
          <form
            className="text-xs w-[100%] sm:text-lg md:text-xl  xl:w-[70%] flex flex-col items-center lg:h-[80%] lg:justify-evenly"
            onSubmit={submitHandler}
          >
            <img
              src={logo}
              alt=""
              className="w-[190px] md:w-[240px] hidden lg:block mb-12 xl:w-[280px]"
            />

            <div className="w-[100%] ">
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Full Name: </p>
                <input
                  type="text"
                  className="w-[70%] outline-none rounded-lg py-1 px-3 border-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Email: </p>
                <input
                  type="email"
                  className="w-[70%] outline-none rounded-lg py-1 px-3 border-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Mobile: </p>
                <input
                  type="number"
                  className="w-[70%] outline-none rounded-lg py-1 px-3 border-2 "
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Date of Birth: </p>
                <div className="w-[70%]">
                  <input
                    type="date"
                    className="min-w-[140px] outline-none rounded-lg py-1 px-3 border-2 w-[60%]"
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Password: </p>
                <div className="w-[70%] outline-none rounded-lg py-1 px-3 border-2 flex justify-between">
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-[90%] outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={showPass ? eyeopen : eyeclose}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => showPassHandler()}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <p className="font-semibold">Confirm Pwd: </p>
                <div className="w-[70%] outline-none rounded-lg py-1 px-3 border-2 flex justify-between">
                  <input
                    type={showConfPass ? "text" : "password"}
                    className="w-[90%] outline-none"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <img
                    src={showConfPass ? eyeopen : eyeclose}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => showConfPassHandler()}
                  />
                </div>
              </div>
            </div>
            <button
              className="bg-[#E25247] text-white py-2 px-7 rounded-lg font-semibold"
              type="submit"
            >
              Sign up
            </button>
            <div className="flex font-semibold my-5 md:text-[16px]">
              <p className="text-[#7A7A7A] pr-2">Already have an account?</p>
              <button
                className="text-[#E25247]"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default SignupPage;
