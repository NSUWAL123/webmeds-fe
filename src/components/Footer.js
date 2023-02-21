import React from 'react'
import logowhite from "../pictures/icons/logo-white.svg";


const Footer = () => {
  return (
    <div className="w-[100%] h-[145px] lg:h-[160px] bg-[#31D490] shadow-xl flex justify-center rounded-t-3xl">
      
          <div className="w-[90%] md:w-[80%] flex justify-between border-b py-2">
            <div>
              <div className="flex items-center mt-3 lg:mt-5">
                <img src={logowhite} alt="" className=" mr-2 lg:w-[30px]" />
                <h1 className="text-white text-2xl font-semibold lg:text-3xl">webmeds</h1>
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