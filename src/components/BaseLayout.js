import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import logo from "../pictures/logo/logo.svg";
import hamburger from "../pictures/icons/hamburger.svg";
import close from "../pictures/icons/close.svg";
import rightarr from "../pictures/icons/rightarrow.svg";
import cart from "../pictures/icons/cart.svg";

const BaseLayout = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const loginHandler = () => {
    navigate("/login");
  };

  const signupHandler = () => {
    navigate("/signup");
  };
  return (
    <div className="relative font-display xl:text-[18px] box-border">
      <div className="">
        <div className="flex justify-between w-screen py-5 px-6 items-center md:px-16 ">
          <div className="flex ">
            <img
              src={hamburger}
              alt=""
              srcset=""
              className="w-max pr-4 xl:w-[55px] xl:mr-4 cursor-pointer"
              onClick={() => setShowSidebar(true)}
            />
            <img src={logo} alt="" srcset="" className="w-[139px] xl:w-[180px] cursor-pointer" onClick={() => {navigate("/")}}/>
          </div>

          <div className="hidden lg:w-[60%] lg:flex">
            <SearchBar/>
          </div>

          <div className="">
            <button
              className="text-[14px] text-[#5D94E7] font-semibold mr-2 xl:mr-8"
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              className="text-[14px] bg-[#31D490] font-semibold text-white py-1 px-2 rounded-2xl xl:px-4"
              onClick={signupHandler}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="lg:hidden">
          <SearchBar/>
        </div>
      </div>

      {/* for sidebar */}
      {showSidebar && (
        <div className="absolute top-0 w-[100vw] h-[100vh] bg-black opacity-30 z-10">
          
        </div>
      )}

      <div
        className={`absolute w-[75%] top-0 left-0 max-w-[350px] h-screen bg-white  ${
          showSidebar ? "translate-x-0" : "translate-x-[-105%] z-20"
        } duration-500 z-20 rounded-r-3xl`}
      >
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <div className="flex justify-between mx-6 my-4 ">
              <img src={logo} alt="" className="w-[150px] xl:w-[180px] cursor-pointer" />
              <button onClick={() => setShowSidebar(false)}>
                <img src={close} alt=""/>
              </button>
            </div>

            <p className="px-6 py-4  bg-[#5D94E7] font-semibold text-[20px] text-white xl:px-8">
              Categories for you
            </p>
            <Categories />
          </div>

          <button className="bg-[#FFC655] flex w-[100%] justify-between items-center rounded-br-3xl">
            <div className="flex py-4 ml-6">
              <img src={cart} alt="" srcset="" className="w-[20px] mr-3" />
              <p className="font-medium text-white">My Cart</p>
            </div>
            <img
              src={rightarr}
              alt=""
              srcset=""
              className="w-[25px] py-4 mr-6"
            />
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default BaseLayout;
