import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import description from "../pictures/icons/description.svg";
import PageNotFound from "./PageNotFound";
import { notifySuccess } from "../utils/Toast";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import ProductNotFound from "../components/ProductNotFound";

const IndividualProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = getTokenFromLocalStorage();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  useEffect(() => {
    (async () => {

      const response = await axios.get(
        `http://localhost:5000/products/${params.pname}`
      );
      const { data } = response;
      setProduct(data);
      setLoading(false);
      window.scrollTo(0, 0);
    })();
  }, [params.pname]);

  console.log(product)

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addProductToCart = async () => {
    const productToBeAdded = {
      productId: product._id,
      quantity: quantity,
    };

    //url and config to be added here ----->
    const response = await axios.post(
      "http://localhost:5000/cart/addCart",
      productToBeAdded,
      config
    );

    notifySuccess(response.data.message);
    console.log(response.data.message);
  };

  return (
    <div>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-2xl font-medium">Loading ...</p>
        </div>
      )}

      {product && !loading ? (
        <div className="w-full flex flex-col items-center">
          <div className="bg-white w-[85%] flex flex-col items-center h-[540px] rounded-3xl font-medium md:flex-row md:h-[300px] md:w-[95%] max-w-[1240px] lg:h-[450px] overflow-auto">
            <div className="h-[55%] flex items-center justify-center md:w-1/2  xl:w-[43%] xl:mr-8 relative">
              <img
                src={product.productPicURL}
                alt=""
                className="w-[225px] border border-[#AAAAAA] rounded-3xl md:w-[255px] lg:w-[360px]"
              />
              {product.stock === 0 && (
                <p className="w-[225px] md:w-[255px] lg:w-[360px] text-xl text-center bg-black opacity-75 mb-2 text-white absolute">
                  Out of Stock
                </p>
              )}
            </div>

            <div className="w-[85%] h-[45%] flex flex-col justify-between md:w-1/2 md:h-[88%] md:justify-between lg:h-[80%]">
              <h1 className="text-[18px] lg:text-[30px]">{product.pname}</h1>
              <div>
                <p className="text-[#7A7A7A] lg:text-[24px]">
                  {product.company}
                </p>
                {product.stock === 0 ? (
                  <p className="text-[#5D94E7] lg:text-[20px]">Out of Stock</p>
                ) : (
                  <p className="text-[#5D94E7] lg:text-[20px]">In Stock</p>
                )}
              </div>

              <div>
                <p className="text-[18px] text-[#E25247] lg:text-[24px]">
                  Rs. {product.offerPrice}
                </p>
                {product.discountPct > 0 && (
                  <div className="flex text-[#7A7A7A] lg:text-[20px]">
                    <p className="pr-3 ">
                      <strike>Rs. {product.price}</strike>
                    </p>
                    <p>-{product.discountPct}%</p>
                  </div>
                )}
              </div>
              <div className="flex lg:text-[20px] items-center">
                <p className="mr-4">Quantity</p>
                <div className="flex items-center">
                  <button
                    className="bg-[#37474F] text-white w-6 h-6 rounded-md mr-3 flex items-center justify-center"
                    onClick={() => {
                      decreaseQty();
                    }}
                  >
                    -
                  </button>
                  <p className="mr-3">{quantity}</p>
                  <button
                    className={`${
                      quantity === 10 || quantity === product.stock
                        ? "bg-[#6a828e]"
                        : "bg-[#37474F]"
                    }  text-white w-6 h-6 rounded-md flex items-center justify-center`}
                    onClick={() => {
                      if (quantity < 10 && quantity < product.stock) {
                        setQuantity(quantity + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              {product.stock === 0 ? (
                <div className="flex justify-center md:justify-start">
                  <button
                    className="bg-[#f57a71] text-white px-2 py-1 rounded-lg my-3 lg:text-[20px] cursor-not-allowed"
                    disabled
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div className="flex justify-center md:justify-start">
                  <button
                    className="bg-[#E25247] text-white px-2 py-1 rounded-lg my-3 lg:text-[20px]"
                    onClick={() => addProductToCart()}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
              {product.stock <= 10 && product.stock > 0 && (
                <p className="text-sm text-center mb-2 text-red-500 md:text-left">
                  Only {product.stock} items left! Get yours fast.
                </p>
              )}
              {/* {product.stock === 0 && (
                <p className="text-sm text-center mb-2 text-red-500 md:text-left">
                  Product Out of Stock!
                </p>
              )} */}
            </div>
          </div>

          {/* description */}
          <div className=" w-[85%] flex flex-col  rounded-3xl font-medium  md:w-[95%] max-w-[1240px] mt-6 md:mt-8">
            <div className="flex">
              <div className="flex bg-[#5D94E7] justify-around items-center w-[180px] rounded-t-2xl px-1 lg:w-[210px]">
                <img src={description} alt="" className="lg:w-[34px]" />
                <p className="font-medium text-white text-[18px] p-2 lg:text-[22px]">
                  Description
                </p>
              </div>
            </div>

            <div className="bg-white flex justify-center rounded-tr-2xl rounded-b-2xl">
              <div className="w-[85%] md:w-[90%] lg:w-[93%]">
                <h1 className="text-[18px] lg:text-[20px] py-2">
                  Product Details:
                </h1>
                <textarea className="text-[#7A7A7A] pb-3 font-normal w-full outline-none h-[300px]" value={product.description} >
                  
                </textarea>
              </div>
            </div>
          </div>

          {/* <img src={product.productPicURL} alt=""  width="200px"/>
      <p>{product.description}</p> */}
        </div>
      ) : (
        <ProductNotFound />
      )}
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default IndividualProduct;
