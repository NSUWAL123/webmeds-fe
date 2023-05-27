import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../pictures/logo/logo.svg";
import hamburger from "../../pictures/icons/hamburger.svg";
import close from "../../pictures/icons/close.svg";
import dashboardicn from "../../pictures/icons/dashboard-admin.svg";
import manageicn from "../../pictures/icons/manage-admin.svg";
import addicn from "../../pictures/icons/add-admin.svg";
import { useNavigate } from "react-router-dom";
import { removeUserFromLocalStorage } from "../../utils/handleToken";

const AdminBaseLayout = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const logoutHandler = () => {
    removeUserFromLocalStorage();
    navigate("/login");
    window.location.reload();
  };

  const navigationTo = (endpoint) => {
    navigate(endpoint);
    setShowSidebar(false);
  };

  return (
    <div className="relative font-display xl:text-[18px] box-border">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md shadow-gray-300 z-30">
        <div className="flex justify-between w-screen py-3 px-6 items-center md:px-10 ">
          <div className="flex ">
            <img
              src={hamburger}
              alt=""
              className="w-max pr-4 xl:w-[55px] xl:mr-5 cursor-pointer"
              onClick={() => setShowSidebar(true)}
            />
            <img
              src={logo}
              alt=""
              className="w-[160px] lg:w-[180px] cursor-pointer"
              onClick={() => {
                navigate("/admin");
              }}
            />
          </div>
        </div>
        <div className="lg:hidden"></div>
      </div>

      {/* for sidebar */}
      {showSidebar && (
        <div
          className="fixed top-0 w-[100vw] h-[100vh] bg-black opacity-30 z-30"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      <div
        className={`fixed w-[75%] top-0 left-0 max-w-[276px] h-screen bg-white  ${
          showSidebar ? "translate-x-0" : "translate-x-[-105%] z-40"
        } duration-500 z-40`}
      >
        <div className="flex flex-col justify-between h-[100%] ">
          <div>
            <div className="flex items-center justify-between mx-4 my-8 ">
              <img src={logo} alt="" className="w-[200px] cursor-pointer" />
              <button onClick={() => setShowSidebar(false)}>
                <img src={close} alt="" />
              </button>
            </div>

            <div
              className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500"
              onClick={() => {
                navigationTo("/admin/");
              }}
            >
              <img src={dashboardicn} alt="" className="px-2" />
              <p className="font-medium text-[16px] text-white px-1 ">
                Dashboard
              </p>
            </div>

            <div
              className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500"
              onClick={() => {
                navigationTo("/admin/add-product");
              }}
            >
              <img src={addicn} alt="" className="px-2" />
              <p className="font-medium text-[16px] text-white px-1">
                Add Product
              </p>
            </div>

            <div
              className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500"
              onClick={() => {
                navigationTo("/admin/manage-product");
              }}
            >
              <img src={manageicn} alt="" className="px-2" />
              <p className="font-medium text-[16px] text-white px-1">
                Manage Products
              </p>
            </div>

            <div
              className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500"
              onClick={() => {
                navigationTo("/admin/manage-order");
              }}
            >
              <div className="px-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_248_5"
                    maskUnits="userSpaceOnUse"
                    x="3"
                    y="1"
                    width="18"
                    height="22"
                  >
                    <path
                      d="M18.5 4H5.5C4.94772 4 4.5 4.44772 4.5 5V21C4.5 21.5523 4.94772 22 5.5 22H18.5C19.0523 22 19.5 21.5523 19.5 21V5C19.5 4.44772 19.0523 4 18.5 4Z"
                      fill="black"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 2V5M15 2V5M8 9.5H16M8 13.5H14M8 17.5H12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </mask>
                  <g mask="url(#mask0_248_5)">
                    <path d="M0 0H24V24H0V0Z" fill="#31D490" />
                    <path d="M0 0H24V24H0V0Z" stroke="#31D490" />
                  </g>
                </svg>
              </div>
              <p className="font-medium text-[16px] text-white px-1">
                Manage Orders
              </p>
            </div>
            <div
              className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500"
              onClick={() => {
                navigationTo("/admin/manage-prescription-order");
              }}
            >
              <div className="px-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_248_5"
                    maskUnits="userSpaceOnUse"
                    x="3"
                    y="1"
                    width="18"
                    height="22"
                  >
                    <path
                      d="M18.5 4H5.5C4.94772 4 4.5 4.44772 4.5 5V21C4.5 21.5523 4.94772 22 5.5 22H18.5C19.0523 22 19.5 21.5523 19.5 21V5C19.5 4.44772 19.0523 4 18.5 4Z"
                      fill="black"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 2V5M15 2V5M8 9.5H16M8 13.5H14M8 17.5H12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </mask>
                  <g mask="url(#mask0_248_5)">
                    <path d="M0 0H24V24H0V0Z" fill="#31D490" />
                    <path d="M0 0H24V24H0V0Z" stroke="#31D490" />
                  </g>
                </svg>
              </div>
              <p className="font-medium text-[16px] text-white px-1">
                Prescription Orders
              </p>
            </div>
          </div>

          <div
            className="bg-[#E25247] rounded-xl mx-6 mb-8 p-2 flex cursor-pointer justify-center hover:shadow-xl duration-500"
            onClick={logoutHandler}
          >
            <p className="font-medium text-[16px] text-white px-1">Logout</p>
          </div>
        </div>
      </div>

      <div className="mt-20 mb-8 sm:mt-28 mx-6 lg:mx-12 xl:mx-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminBaseLayout;
