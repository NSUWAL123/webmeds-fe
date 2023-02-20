import React from 'react'
import logowhite from "../pictures/icons/logo-white.svg";


const Footer = () => {
  return (
    <div className="w-[100%] h-[120px] lg:h-[150px] bg-[#37474F] shadow-xl flex justify-center">
          <div className="w-[90%] md:w-[80%] flex justify-between">
            <div>
              <div className="flex items-center mt-3 lg:mt-5">
                <img src={logowhite} alt="" srcset="" className=" mr-2" />
                <h1 className="text-white text-2xl font-semibold ">webmeds</h1>
              </div>

              <div className="text-[#F2F2F2] text-sm lg:text-lg">
                <p className="my-1">Kupondole Heights</p>
                <p>Lalitpur, Nepal</p>
              </div>
            </div>

            <div className="text-white  ">
              <h1 className="mt-4 font-medium text-[18px] lg:text-[22px]">
                Contact
              </h1>
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
  )
}

export default Footer