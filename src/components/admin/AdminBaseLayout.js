import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../pictures/logo/logo.svg";
import hamburger from "../../pictures/icons/hamburger.svg";
import close from "../../pictures/icons/close.svg";
import dashboardicn from "../../pictures/icons/dashboard-admin.svg";
import manageicn from "../../pictures/icons/manage-admin.svg";
import addicn from "../../pictures/icons/add-admin.svg";
import { useNavigate } from "react-router-dom";


const AdminBaseLayout = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const logoutHandler = () => {};

  return (
    <div className="relative font-display xl:text-[18px] box-border">
      <div className="">
        <div className="flex justify-between w-screen py-3 px-6 items-center md:px-10 ">
          <div className="flex ">
            <img
              src={hamburger}
              alt=""
              className="w-max pr-4 xl:w-[55px] xl:mr-5 cursor-pointer"
              onClick={() => setShowSidebar(true)}
            />
            <img src={logo} alt="" className="w-[160px] lg:w-[180px] cursor-pointer" onClick={() => {navigate("/admin")}}/>
          </div>
          
        </div>
        <div className="lg:hidden"></div>
      </div>

      {/* for sidebar */}
      {showSidebar && (
        <div className="absolute top-0 w-[100vw] h-[100vh] bg-black opacity-30 z-10"></div>
      )}

      <div
        className={`absolute w-[75%] top-0 left-0 max-w-[276px] h-screen bg-white  ${
          showSidebar ? "translate-x-0" : "translate-x-[-105%] z-20"
        } duration-500 z-20`}
      >
        <div className="flex flex-col justify-between h-[100%] ">
          <div>
            <div className="flex items-center justify-between mx-4 my-8 ">
              <img src={logo} alt="" className="w-[200px] cursor-pointer" />
              <button onClick={() => setShowSidebar(false)}>
                <img src={close} alt="" />
              </button>
            </div>

            <div className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500" onClick={() => {navigate("/admin")}}>
              <img src={dashboardicn} alt="" className="px-2" />
              <p className="font-medium text-[16px] text-white px-1 ">
                Dashboard
              </p>
            </div>

            <div className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500" onClick={() => {navigate("/admin/add-item")}}>
              <img src={addicn} alt="" className="px-2" />
              <p className="font-medium text-[16px] text-white px-1">
                Add Item
              </p>
            </div>

            <div className="bg-[#37474F] rounded-xl mx-6 my-4 p-2 flex cursor-pointer hover:shadow-xl duration-500" onClick={() => {navigate("/admin/manage-item")}}>
              <img src={manageicn} alt="" className="px-2" />
              <p className="font-medium text-[16px] text-white px-1">
                Manage Item
              </p>
            </div>
          </div>

          <div className="bg-[#E25247] rounded-xl mx-6 mb-8 p-2 flex cursor-pointer justify-center hover:shadow-xl duration-500" onClick={logoutHandler}>
              <p className="font-medium text-[16px] text-white px-1">
                Logout
              </p>
            </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminBaseLayout;
