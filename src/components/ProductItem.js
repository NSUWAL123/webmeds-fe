import React from "react";
import carticn from "../pictures/icons/cart.svg";
import { useNavigate } from "react-router-dom";

const ProductItem = (props) => {
  const navigate = useNavigate();

  let { product } = props;
  const showIndProduct = (product) => {
    navigate(`/products/${product.pname}`);
  };

  return (
    <div
      className="text-sm p-2 h-[240px] flex flex-col justify-between bg-white shadow-lg shadow-[#cdcdcd] hover:shadow-[#AAAAAA] hover:scale-110 duration-200 cursor-pointer rounded-lg mb-3 border-t border-[#F2F2F2] lg:h-[310px] lg:text-[16px]"
      onClick={() => {
        showIndProduct(product);
      }}
    >
      <img
        src={product.productPicURL}
        alt=""
        className="w-[145px] lg:w-[200px] border rounded-md "
      />
      <p className="font-medium w-[145px] lg:w-[200px] overflow-hidden">{product.pname}</p>
      <div className="flex justify-between items-center">
        <p className="text-[#E25247] font-medium">Rs. {product.offerPrice}</p>
      </div>
      {product.discountPct !== 0 ? (
        <div className="flex">
          <p className="pr-2 text-[#AAAAAA]">
            <strike>Rs. {product.price}</strike>
          </p>
          <p>-{product.discountPct}%</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProductItem;
