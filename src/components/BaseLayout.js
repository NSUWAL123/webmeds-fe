import React, { useState } from "react";
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
import notification from "../pictures/icons/notification.svg";
import chat from "../pictures/icons/chat.svg";
import logout from "../pictures/icons/logout.svg";
import { isUserLoggedIn, removeUserFromLocalStorage } from "../utils/handleToken";

const BaseLayout = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMore, setShowMore] = useState(false);

  let login = isUserLoggedIn();

  // const loginHandler = () => {
  //   navigate("/login");
  // };

  const toggleMore = () => {
    showMore ? setShowMore(false) : setShowMore(true);
  };

  const navigationTo = (endpoint) => {
    navigate(endpoint);
    setShowSidebar(false);
  };

  return (
    <div className="relative font-display xl:text-[18px] flex">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md shadow-gray-300 z-10">
        <div className="flex justify-between py-5 px-6 items-center md:px-12 lg:py-3">
          <div className="flex ">
            <img
              src={hamburger}
              alt=""
              className="w-max pr-4 xl:w-[55px] xl:mr-4 cursor-pointer"
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

          <div className="hidden lg:w-[60%] lg:flex">
            <SearchBar />
          </div>

          <div
            className={`w-screen h-screen absolute top-0 left-0 ${
              showMore ? "block" : "hidden"
            }`}
            onClick={() => toggleMore()}
          ></div>
          {/* dropdown */}
          <div className="flex relative ">
            <div className="cursor-pointer">
              <img
                src={more}
                alt=""
                className={`${!login ? "": "mr-3"} lg:mr-6 w-[30px] lg:w-[35px]`}
                onClick={() => toggleMore()}
              />

              <div
                className={`${
                  showMore ? "block" : "hidden"
                } absolute  ${!login ? "-translate-x-[170px]": "-translate-x-[100px]"} bg-white shadow-2xl w-[210px] text-[15px] border-t-[1px] duration-500 rounded-md `}
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
                  <p className="hover:font-medium">Manage Profile</p>
                </div>
                <div
                  className="flex items-center border-b-[1px] cursor-pointer"
                  onClick={() => {
                    navigate("/upload-prescription");
                    setShowMore(false);
                  }}
                >
                  <img src={camera} alt="" width="22px" className="mx-3 my-2" />
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
                  <img src={order} alt="" width="25px" className="mx-3 my-2" />
                  <p className="hover:font-medium">Orders</p>
                </div>
                <div
                  className="flex items-center border-b-[1px] cursor-pointer"
                  onClick={() => {
                    navigate("/notes");
                    setShowMore(false);
                  }}
                >
                  <img src={notes} alt="" width="25px" className="mx-3 my-2" />
                  <p className="hover:font-medium">Notes</p>
                </div>
                <div
                  className="flex items-center border-b-[1px] cursor-pointer"
                  onClick={() => {
                    navigate("/notifications");
                    setShowMore(false);
                  }}
                >
                  <img
                    src={notification}
                    alt=""
                    width="25px"
                    className="mx-3 my-2"
                  />
                  <p className="hover:font-medium">Notifications</p>
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
                <div className={`${!login ? "flex": "hidden"} items-center cursor-pointer` }onClick={() => {
                    removeUserFromLocalStorage()
                    setShowMore(false);
                    }}>
                  <img src={logout} alt="" width="25px" className="mx-3 my-2" />
                  <p className="text-[#E25247] hover:font-medium" >Logout</p>
                </div>
              </div>
            </div>
                {(login) && (

            <button
              className="text-[14px] bg-[#E25247] font-semibold text-white py-1 px-3 rounded-3xl xl:px-5 xl:py-1 xl:text-[16px] "
              onClick={() => navigationTo("/login")}
            >
              Login
            </button>
                )}
          </div>
        </div>
        <div className="lg:hidden">
          <SearchBar />
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
        className={`fixed w-[75%] top-0 left-0 max-w-[350px] h-screen bg-white  ${
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
            {/* <div>
              <div
                className="flex cursor-pointer hover:scale-110 duration-300 hover:ml-2"
                onClick={() => navigationTo("/profile")}
              >
                <img src={profile} alt="" className=" ml-6 mr-3" />
                <p>Manage Profile</p>
              </div>
              <div
                className="flex my-3 cursor-pointer hover:scale-110 hover:ml-2 duration-300"
                onClick={() => navigationTo("/upload-prescription")}
              >
                <img src={camera} alt="" className="ml-7 mr-3" />
                <p>Upload Prescription</p>
              </div>
            </div> */}
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
      <div className="pt-40 pb-8 lg:pt-24 px-4 lg:px-12 xl:px-20 bg-[#F2F2F2] w-[100%] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
