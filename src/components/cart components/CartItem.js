import React from "react";
import testpic from "../../pictures/Test/meadbery.png";
import close from "../../pictures/icons/close.svg";

const CartItem = () => {
  return (
    <div className="flex justify-between items-center py-4 border-b border-slate-300 sm:px-6">
      <div className="flex items-center w-[80%] sm:w-[60%] justify-between lg:w-[56%]">
        <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5" />
        <img
          src={testpic}
          alt=""
          className="w-[60px] h-[60px] border rounded-md sm:w-[100px] sm:h-[100px]"
        />
        <div>
          <p className="my-2 font-medium">Vitamin C tablets</p>
          <div className="flex">
            <p className="mr-3">Quantity:</p>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md mr-3">
                -
              </div>
              <p className="">1</p>
              <div className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md  ml-3">
                +
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            <p className="my-2">Rs. 1200 -50%</p>
            <p className="text-[#E25247]">Rs. 600</p>
          </div>
        </div>
      </div>

      <div className="sm:flex sm:w-[28%] sm:justify-between">
        <div className="hidden sm:block">
          <p className="text-[#7A7A7A]"><strike>Rs. 1200</strike> -50%</p>
          <p className="text-[#E25247]">Rs. 600</p>
        </div>
        <img src={close} alt="" className="w-[25px]" />
      </div>
    </div>
  );
};

export default CartItem;
