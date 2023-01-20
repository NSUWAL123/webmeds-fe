import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import description from "../pictures/icons/description.svg";

const IndividualProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      const response = await axios.get(
        `http://localhost:5000/products/${params.pname}`
      );
      const { data } = response;
      setProduct(data);
      console.log(data);
    })();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white w-[85%] flex flex-col items-center h-[530px] rounded-3xl font-medium md:flex-row md:h-[300px] md:w-[95%] max-w-[1240px] lg:h-[450px]">
        <div className="h-[55%] flex items-center justify-center md:w-1/2  xl:w-[43%] xl:mr-8">
          <img
            src={product.productPicURL}
            alt=""
            className="w-[225px] border border-[#AAAAAA] rounded-3xl md:w-[255px] lg:w-[360px]"
          />
        </div>

        <div className="w-[85%] h-[45%] flex flex-col justify-between md:w-1/2 md:h-[88%] md:justify-between lg:h-[80%]">
          <h1 className="text-[18px] lg:text-[30px]">{product.pname}</h1>
          <div>
            <p className="text-[#7A7A7A] lg:text-[24px]">{product.company}</p>
            <p className="text-[#5D94E7] lg:text-[20px]">In Stock</p>
          </div>

          <div>
            <p className="text-[18px] text-[#E25247] lg:text-[24px]">
              Rs. {product.offerPrice}
            </p>
            <div className="flex text-[#7A7A7A] lg:text-[20px]">
              <p className="pr-3 ">
                <strike>Rs. {product.price}</strike>
              </p>
              <p>-{product.discountPct}%</p>
            </div>
          </div>
          <div className="flex lg:text-[20px] items-center">
            <p className="mr-4">Quantity</p>
            <div className="flex items-center">
              <button className="bg-[#37474F] text-white w-6 h-6 rounded-md mr-3 flex items-center justify-center">
                -
              </button>
              <p className="mr-3">1</p>
              <button className="bg-[#37474F] text-white w-6 h-6 rounded-md flex items-center justify-center">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <button className="bg-[#E25247] text-white px-2 py-1 rounded-lg my-3 lg:text-[20px]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className=" w-[85%] flex flex-col  rounded-3xl font-medium  md:w-[95%] max-w-[1240px] mt-6 md:mt-8">
        <div className="flex">
          <div className="flex bg-[#5D94E7] justify-around items-center w-[180px] rounded-t-2xl px-1 lg:w-[210px]">
            <img src={description} alt="" className="lg:w-[34px]" />
            <p className="font-medium text-white text-[18px] p-2 lg:text-[24px]">
              Description
            </p>
          </div>
        </div>

        <div className="bg-white flex justify-center rounded-tr-2xl rounded-b-2xl">
          <div className="w-[85%] md:w-[90%] lg:w-[93%]">
            <h1 className="text-[18px] lg:text-[20px] py-2">
              Product Details:
            </h1>
            <p className="text-[#7A7A7A] pb-3 font-normal">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* <img src={product.productPicURL} alt="" srcset="" width="200px"/>
      <p>{product.description}</p> */}
    </div>
  );
};

export default IndividualProduct;
