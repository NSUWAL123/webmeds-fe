import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div>
      <div className="flex flex-col h-[80%] ml-6 xl:ml-8">
        <Link
          to="/"
          className="my-2 mt-4 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          OTC Medicines
        </Link>
        <Link
          to="/"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          Home Essentials
        </Link>
        <Link
          to="/"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          Health & Nutrition
        </Link>
        <Link
          to="/"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          Skin Care
        </Link>
        <Link
          to="/"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          Hair Care
        </Link>
        <Link
          to="/"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          Baby Care
        </Link>
        <Link
          to="/"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          Covid Essentials
        </Link>
        <Link
          to="/"
          className="my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]"
        >
          Health Devices
        </Link>
      </div>
    </div>
  );
};

export default Categories;
