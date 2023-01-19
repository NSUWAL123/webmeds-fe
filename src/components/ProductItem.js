import React from "react";
import carticn from "../pictures/icons/cart.svg"

const ProductItem = (props) => {
  let { product } = props;
  //console.log(product)
  return (
    <div className="text-sm p-2 h-[240px] flex flex-col justify-between bg-white shadow-lg shadow-[#cdcdcd] hover:shadow-[#AAAAAA] hover:scale-110 duration-200 cursor-pointer rounded-lg mb-3 border-t border-[#F2F2F2] lg:h-[310px] lg:text-[16px] ">
      <img src={product.productPicURL} alt="" className="w-[145px] lg:w-[200px] border rounded-md "/>
      <p className="font-medium">{product.pname}</p>
      <div className="flex justify-between items-center">
        <p className="text-[#E25247] font-medium">Rs. {product.offerPrice}</p>
        {/* <button className="flex items-center bg-[#E25247] text-white px-1 py-[2px]  rounded-lg lg:px-2 lg:py-1">
          <img src={carticn} className="hidden lg:block w-[15px] mr-1" alt="" />
          <p className="text-[12px] lg:text-[14px]">Add To Cart</p>
        </button> */}
      </div>
      {product.discountPct !== 0 ?
      (<div className="flex">
        <p className="pr-2 text-[#AAAAAA]"><strike>Rs. {product.price}</strike></p>
        <p>-{product.discountPct}%</p>
      </div>) :
      (
        <div></div>
      )      
    }
    </div>
  );
};

export default ProductItem;
