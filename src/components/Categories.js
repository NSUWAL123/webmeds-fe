import React from "react";
import { p, useNavigate } from "react-router-dom";

const Categories = (props) => {
  const {showSidebar, setShowSidebar} = props;
  const navigate = useNavigate();

  const navigateTo = (endpoint) => {
    navigate(`/category/${endpoint}`);
    if (showSidebar === true) {
      setShowSidebar(false);
    }
}

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-around md:text-sm md:items-center h-[80%] mx-6 xl:mx-8">
        <p
          className="my-2 mt-4 md:mt-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:font-normal md:hover:ml-0 md:hover:text-white xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("OTC Medicines")}
        >
          OTC 
        </p>
        <p
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("Household")}
        >
          Household
        </p>
        <p
          // to="/category/Health & Nutrition"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("Health & Nutrition")}
        >
          Health & Nutrition
        </p>
        <p
          // to="/category/Skin Care"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("Skin Care")}
        >
          Skin Care
        </p>
        <p
          // to="/category/Hair Care"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("Hair Care")}
        >
          Hair Care
        </p>
        <p
          // to="/category/Baby Care"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("Baby Care")}
        >
          Baby Care
        </p>
        <p
          // to="/category/Covid Essentials"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("Covid Essentials")}
        >
          Covid Essentials
        </p>
        <p
          // to="/category/Health Devices"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px] cursor-pointer"
          onClick={() => navigateTo("Health Devices")}
        >
          Health Devices
        </p>
      </div>
    </div>
  );
};

export default Categories;
