import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import logo from "../pictures/logo/logo.svg";
import hamburger from "../pictures/icons/hamburger.svg";
import close from "../pictures/icons/close.svg";
import rightarr from "../pictures/icons/rightarrow.svg";
import cart from "../pictures/icons/cart.svg";
import profile from "../pictures/icons/profile-icon.svg";
import camera from "../pictures/icons/camera-icon.svg";
import more from "../pictures/icons/more.svg";
import blackcart from "../pictures/icons/cart-black.svg";
import order from "../pictures/icons/orders.svg";
import notes from "../pictures/icons/add-note.svg";
// import notification from "../pictures/icons/notification.svg";
import prescriptionicn from "../pictures/icons/prescription.svg";
import chat from "../pictures/icons/chat.svg";
import logout from "../pictures/icons/logout.svg";
import chaticn from "../pictures/icons/chat-icn.svg";
import { Link } from "react-router-dom";

import {
  getTokenFromLocalStorage,
  isUserLoggedIn,
  removeUserFromLocalStorage,
} from "../utils/handleToken";
import { useDispatch } from "react-redux";
import { populateUser } from "../redux/userSlice";
import axios from "axios";
import Footer from "./Footer";

const BaseLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [bgdiv, setBgdiv] = useState(false);

  let login = isUserLoggedIn();

  const toggleMore = () => {
    showMore ? setShowMore(false) : setShowMore(true);
  };

  const navigationTo = (endpoint) => {
    navigate(endpoint);
    setShowSidebar(false);
  };

  const token = getTokenFromLocalStorage();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  useEffect(() => {
    (async () => {
      const user = await axios.get(
        "http://localhost:5000/user/getUser/",
        config
      );
      dispatch(populateUser(user.data));
    })();
  }, []);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="relative font-display xl:text-[18px] flex">
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md shadow-gray-300 z-10">
          <div className="flex justify-between py-5 px-6 items-center md:px-12 lg:py-3">
            <div className="flex">
              <img
                src={hamburger}
                alt=""
                className="w-max pr-4 xl:w-[55px] xl:mr-4 cursor-pointer md:hidden"
                onClick={() => setShowSidebar(true)}
              />
              <img
                src={logo}
                alt=""
                className="w-[139px] xl:w-[180px] cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            <div className="hidden lg:w-[60%] lg:flex py-1">
              <SearchBar />
            </div>

            {/* <div
              className={`w-screen h-screen absolute top-0 left-0 ${
                showMore ? "block" : "hidden"
              }`}
              onClick={() => toggleMore()}
            ></div> */}

            {/* dropdown */}
            <div className="flex relative z-10 items-center">
              <div className="group flex relative ">
                <Link to="/profile">
                  <img
                    src={profile}
                    alt=""
                    className="mr-2 sm:mr-5 sm:w-[30px] xl:mr-7"
                  />
                </Link>

                <span
                  className="group-hover:opacity-100 transition-opacity  px-2 text-sm text-gray-100 absolute left-1/2 
    -translate-x-1/2 translate-y-2/3 opacity-0  mx-auto w-[55px] justify-center flex flex-col items-center "
                >
                  <div
                    className="w-0 h-0 
   border-l-[8px] border-l-transparent
   border-b-[10px] border-b-gray-700
   border-r-[8px] border-r-transparent
   mr-2 sm:mr-5 xl:mr-7"
                  ></div>
                  <p className="bg-gray-700 w-[90px] justify-center flex py-1 rounded-md mr-2 sm:mr-5 xl:mr-7 ">
                    My Profile
                  </p>
                </span>
              </div>

              <div className="group flex relative">
                <Link to="/cart">
                  <img
                    src={blackcart}
                    alt=""
                    className="mr-2 sm:mr-5 sm:w-[30px] xl:mr-7"
                  />
                </Link>
                <span
                  className="group-hover:opacity-100 transition-opacity  px-2 text-sm text-gray-100 absolute left-1/2 
    -translate-x-1/2 translate-y-2/3 opacity-0  mx-auto w-[55px] justify-center flex flex-col items-center "
                >
                  <div
                    className="w-0 h-0 
   border-l-[8px] border-l-transparent
   border-b-[10px] border-b-gray-700
   border-r-[8px] border-r-transparent
   mr-2 sm:mr-5 xl:mr-7
    "
                  ></div>
                  <p className="bg-gray-700 w-[75px] justify-center flex py-1 rounded-md mr-2 sm:mr-5 xl:mr-7">
                    My Cart
                  </p>
                </span>
              </div>
              <div className="group flex relative ">
                <Link to="upload-prescription">
                  <img
                    src={camera}
                    alt=""
                    className="mr-2 sm:mr-5 xl:mr-7 sm:w-[28px] "
                  />
                </Link>
                <span
                  className=" group-hover:opacity-100 transition-opacity px-2 text-sm text-gray-100 absolute left-1/2 
    -translate-x-1/2 translate-y-2/3 opacity-0  mx-auto w-[55px] justify-center flex flex-col items-center"
                >
                  <div
                    className="w-0 h-0 
   border-l-[8px] border-l-transparent
   border-b-[10px] border-b-gray-700
   border-r-[8px] border-r-transparent
   mr-2 sm:mr-5 xl:mr-7"
                  ></div>
                  <p className="bg-gray-700 w-[155px] justify-center flex py-1 rounded-md mr-2 sm:mr-5 xl:mr-7">
                    Upload Prescription
                  </p>
                </span>
              </div>

              <div className="cursor-pointer group flex relative">
                <img
                  src={more}
                  alt=""
                  className={`${
                    !login ? "" : "mr-3"
                  } lg:mr-6 w-[30px]`}
                  onClick={() => toggleMore()}
                />
                <span
                  className="group-hover:opacity-100 transition-opacity  px-2 text-sm text-gray-100 absolute left-1/2 
    -translate-x-1/2 translate-y-2/3 opacity-0  mx-auto w-[55px] justify-center flex flex-col items-center"
                >
                  <div
                    className="w-0 h-0 
   border-l-[8px] border-l-transparent
   border-b-[10px] border-b-gray-700
   border-r-[8px] border-r-transparent
   lg:mr-5  xl:mr-7"
                  ></div>
                  <p className="bg-gray-700 w-[55px] justify-center flex py-1 rounded-md lg:mr-5 xl:mr-7">
                    More
                  </p>
                </span>

                {/* more button div */}
                <div
                  className={`${showMore ? "block" : "hidden"} absolute  ${
                    !login ? "-translate-x-[170px]" : "-translate-x-[100px]"
                  } bg-white shadow-2xl w-[210px] text-[15px] border-t-[1px] duration-500 rounded-md mt-8 lg:mt-10 z-10`}
                >
                  <div
                    className="flex items-center border-b-[1px] cursor-pointer"
                    onClick={() => {
                      navigate("/profile");
                      setShowMore(false);
                    }}
                  >
                    <img
                      src={profile}
                      alt=""
                      width="25px"
                      className="mx-3 my-2"
                    />
                    <p className="hover:font-medium">My Profile</p>
                  </div>
                  <div
                    className="flex items-center border-b-[1px] cursor-pointer"
                    onClick={() => {
                      navigate("/upload-prescription");
                      setShowMore(false);
                    }}
                  >
                    <img
                      src={camera}
                      alt=""
                      width="22px"
                      className="mx-3 my-2"
                    />
                    <p className="hover:font-medium">Upload Prescription</p>
                  </div>
                  <div
                    className="flex items-center border-b-[1px] cursor-pointer"
                    onClick={() => {
                      navigate("/cart");
                      setShowMore(false);
                    }}
                  >
                    <img
                      src={blackcart}
                      alt=""
                      width="25px"
                      className="mx-3 my-2"
                    />
                    <p className="hover:font-medium">Cart</p>
                  </div>
                  <div
                    className="flex items-center border-b-[1px] cursor-pointer"
                    onClick={() => {
                      navigate("/orders");
                      setShowMore(false);
                    }}
                  >
                    <img
                      src={order}
                      alt=""
                      width="25px"
                      className="mx-3 my-2"
                    />
                    <p className="hover:font-medium">Orders</p>
                  </div>
                  <div
                    className="flex items-center border-b-[1px] cursor-pointer"
                    onClick={() => {
                      navigate("/notes");
                      setShowMore(false);
                    }}
                  >
                    <img
                      src={notes}
                      alt=""
                      width="25px"
                      className="mx-3 my-2"
                    />
                    <p className="hover:font-medium">Notes</p>
                  </div>
                  <div
                    className="flex items-center border-b-[1px] cursor-pointer"
                    onClick={() => {
                      navigate("/prescription-order");
                      setShowMore(false);
                    }}
                  >
                    <img
                      src={prescriptionicn}
                      alt=""
                      width="25px"
                      className="mx-3 my-2"
                    />
                    <p className="hover:font-medium">Prescription Order</p>
                  </div>
                  <div
                    className="flex items-center border-b-[1px] cursor-pointer"
                    onClick={() => {
                      navigate("/chat");
                      setShowMore(false);
                    }}
                  >
                    <img src={chat} alt="" width="25px" className="mx-3 my-2" />
                    <p className="hover:font-medium">Chat</p>
                  </div>
                  <div
                    className={`${
                      !login ? "flex" : "hidden"
                    } items-center cursor-pointer`}
                    onClick={() => {
                      removeUserFromLocalStorage();
                      setShowMore(false);
                      navigate("/login");
                      window.location.reload();
                    }}
                  >
                    <img
                      src={logout}
                      alt=""
                      width="25px"
                      className="mx-3 my-2"
                    />
                    <p className="text-[#E25247] hover:font-medium">Logout</p>
                  </div>
                </div>
              </div>
              {login && (
                <button
                  className="text-[14px] bg-[#E25247] font-semibold text-white py-1 px-3 rounded-3xl xl:px-5 xl:py-1 xl:text-[16px] "
                  onClick={() => navigationTo("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
          <div className="lg:hidden  mb-5">
            <SearchBar />
          </div>
          <div className="hidden md:block bg-[#5D94E7]">
            <Categories />
          </div>
        </div>

        {/* for sidebar */}
        {showSidebar && (
          <div
            className="fixed top-0 w-[100%] h-[100vh] bg-black opacity-30 z-10"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        <div
          className={`fixed md:hidden w-[75%] top-0 left-0 max-w-[350px] h-screen bg-white  ${
            showSidebar ? "translate-x-0" : "translate-x-[-105%] z-20"
          } duration-500 z-20 rounded-r-3xl `}
        >
          <div className="flex flex-col justify-between h-[100%]">
            <div>
              <div className="flex justify-between mx-6 my-4 ">
                <img
                  src={logo}
                  alt=""
                  className="w-[150px] xl:w-[180px] cursor-pointer"
                />
                <button onClick={() => setShowSidebar(false)}>
                  <img src={close} alt="" />
                </button>
              </div>

              <p className="px-6 py-4  bg-[#5D94E7] font-semibold text-[20px] text-white xl:px-8">
                Categories for you
              </p>
              <Categories />
            </div>
            <div>
              <button
                className="bg-[#FFC655] flex w-[100%] justify-between items-center rounded-br-3xl"
                onClick={() => navigationTo("/cart")}
              >
                <div className="flex py-4 ml-6">
                  <img src={cart} alt="" className="w-[20px] mr-3" />
                  <p className="font-medium text-white">My Cart</p>
                </div>
                <img src={rightarr} alt="" className="w-[25px] py-4 mr-6" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="pt-40 md:pt-44 pb-8 lg:pt-32 px-4 lg:px-12 xl:px-20 bg-[#F2F2F2] w-[100%] min-h-screen"
          onClick={() => setShowMore(false)}
        >
          <Outlet />
        </div>

        <Link to="/chat">
          <div className="fixed bottom-8 right-8 w-[65px] bg-white rounded-full p-1 shadow-lg border">
            <img src={chaticn} alt="" className="" />
          </div>
        </Link>
      </div>

      <div
        className="w-[100%]  rounded-t-3xl border mt-8"
        onClick={() => setShowMore(false)}
      >
        <Footer />
        <div className="text-white bg-[#31D490]  flex justify-center lg:text-lg">
          <p className="py-2">&#169; 2023, webmeds.com</p>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
