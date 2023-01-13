import React from "react";

const AddProduct = () => {
  return (
    <div className="h-[950px] sm:h-[820px] xl:h-[550px]">
      <div className="flex justify-center text-3xl sm:text-[32px] font-semibold mb-4">
        <p className="text-[#37474F]">Product Information</p>
      </div>
      {/* bottom-cont */}
      <div className="xl:flex xl:justify-between xl:h-[80%] xl:mt-12">
        {/* left-cont */}
        <div className="xl:w-[42%] flex flex-col  justify-around h-[450px] sm:h-[380px] xl:h-[100%]">
          <div className="">
            <p className="mb-1 text-[#37474F] font-semibold">Product Name</p>
            <input
              type="text"
              className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
            />
          </div>

          <div className="sm:flex sm:justify-between">
            <div className="mb-4 sm:mb-0 sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Purpose</p>
              <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              />
            </div>
            <div className="sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Type</p>
              <select name="type" id="" className="bg-[#EEEEEE] outline-none rounded-md w-full pl-2 py-1 border-black border-[1px] ">
                <option value="OTC">OTC</option>
                <option value="Non-OTC">Non-OTC</option>
              </select>
              {/* <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              /> */}
            </div>
          </div>
          <div className="sm:flex sm:justify-between">
            <div className="sm:w-[42%] mb-4 sm:mb-0">
              <p className="mb-1 text-[#37474F] font-semibold">Category</p>
              <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              />
            </div>
            <div className="sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Company</p>
              <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[30%]">
              <p className="mb-1 text-[#37474F] font-semibold">Price</p>
              <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              />
            </div>
            <div className="w-[30%]">
              <p className="mb-1 text-[#37474F] font-semibold">Discount %</p>
              <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              />
            </div>
            <div className="w-[30%]">
              <p className="mb-1 text-[#37474F] font-semibold">
                Offer Price
              </p>
              <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              />
            </div>
          </div>
        </div>

        <div className="xl:h-[100%] xl:w-[1px] bg-[#37474F]"></div>

        {/* right-container */}
        <div className="xl:w-[42%] flex flex-col justify-around h-[450px] sm:h-[380px]  xl:h-[100%]">
          
          <div className="sm:flex sm:justify-between">
            <div className="mb-4 sm:mb-0 sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Stock</p>
              <input
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              />
            </div>
            <div className="sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Expiry Date</p>
              <input
                type="date"
                className="bg-[#EEEEEE] outline-none border-black border-[1px] rounded-md w-full px-4 py-1"
              />
            </div>
          </div>
          <div className="flex items-center">
            <p className="mb-1 text-[#37474F] font-semibold mr-8">Add Picture</p>
            <input
              type="file"
              className=""
            />
          </div>
          <div className="">
            <p className="mb-1 text-[#37474F] font-semibold">Description</p>
            <textarea
              type="text"
              className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1 h-[100px] resize-none"
            />
          </div>

          <div className="flex justify-around sm:mx-16">
            <button className="bg-[#37474F] text-white font-medium px-4 py-1 rounded-md">Add Product</button>
            <button className="bg-[#E25247] text-white font-medium px-4 py-1 rounded-md">Clear Form</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
