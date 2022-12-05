import React from "react";
import pna from "../pictures/photo/page-not-found.svg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-[550px] flex justify-center items-center lg:h-[610px] lg:items-center">
      <div className="flex flex-col items-center justify-around w-3/4 h-[60%] mb-14 lg:flex-row lg:w-[90%] lg:items-center xl:w-[80%]">
        <img
          src={pna}
          alt=""
          srcset=""
          className="mb-8 md:mb-0 md:w-[350px] lg:w-[420px] xl:w-[520px]"
        />
        <div className="flex flex-col items-center justify-between mb-5">
          <h1 className="text-[20px] font-semibold md:text-3xl md:mt-10">
            Oops! Page Not Found
          </h1>
          <p className="text-[14px] font-medium mt-3 md:text-xl md:mt-6">
            The page you are looking for does not exist.
          </p>
          <button
            className="text-[14px] bg-[#5D94E7] px-3 py-2 font-medium text-white rounded-3xl mt-5 md:text-xl md:mt-6"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
