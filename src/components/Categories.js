import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Categories = (props) => {
  const {setShowSidebar} = props;
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-around md:text-sm md:items-center h-[80%] mx-6 xl:mx-8">
        <Link
          to="/category/OTC Medicines"
          className="my-2 mt-4 md:mt-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:font-normal md:hover:ml-0 md:hover:text-white xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          OTC 
        </Link>
        <Link
          to="/category/Household"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          Household
        </Link>
        <Link
          to="/category/Health & Nutrition"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          Health & Nutrition
        </Link>
        <Link
          to="/category/Skin Care"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          Skin Care
        </Link>
        <Link
          to="/category/Hair Care"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          Hair Care
        </Link>
        <Link
          to="/category/Baby Care"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          Baby Care
        </Link>
        <Link
          to="/category/Covid Essentials"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          Covid Essentials
        </Link>
        <Link
          to="/category/Health Devices"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px] md:text-white font-medium md:hover:ml-0 md:font-normal md:hover:text-white  xl:text-[15px]"
          onClick={() => setShowSidebar(false)}
        >
          Health Devices
        </Link>
      </div>
    </div>
  );
};

export default Categories;
