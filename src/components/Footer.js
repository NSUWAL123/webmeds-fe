import React from "react";
import logowhite from "../pictures/icons/logo-white.svg";
import wave3 from "../pictures/photo/wave3.svg";

const Footer = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${wave3})` }}
        className="w-[100%] h-[50px] bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="w-[100%] h-[145px] lg:h-[160px] shadow-xl flex justify-center bg-[#37474F]">
        <div className="w-[90%] md:w-[80%] flex justify-between border-b py-2">
          <div>
            <div className="flex items-center  mb-2">
              <img src={logowhite} alt="" className=" mr-2 lg:w-[30px]" />
              <h1 className="text-white text-2xl font-semibold lg:text-3xl">
                webmeds
              </h1>
            </div>

            <div className="text-[#F2F2F2] text-sm lg:text-lg">
              <p className="my-1">Kupondole Heights</p>
              <p>Lalitpur, Nepal</p>
            </div>
          </div>

          <div className="text-white  ">
            <h1 className="font-medium text-[18px] lg:text-[22px]">Contact</h1>
            <a
              href="mailto:webmedsnepal@gmail.com"
              className="text-sm lg:text-lg"
            >
              webmedsnepal@gmail.com
            </a>
            <div></div>
            <a href="tel:>9808905325" className="text-sm lg:text-lg">
              9808905325
            </a>
            <div></div>
            <a href="tel:>9840000856" className="text-sm lg:text-lg">
              9840000856
            </a>
          </div>
        </div>

        {/* bg-gradient-to-r from-[#4891ff] to-[#00c975] */}
      </div>
    </div>
  );
};

export default Footer;
