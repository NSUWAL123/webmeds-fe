import React, { useEffect, useState } from "react";
import close from "../../pictures/icons/close.svg";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/handleToken";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderLine,
  populateCartProducts,
  removeItemFromCart,
  removeOrderLine,
  updateIsCheck,
  updateOrderLineQuantity,
  updateOrderSummary,
  updateQuantity,
} from "../../redux/cartSlice";
import checkExpiry from "../../utils/checkExpiry";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const cartItem = props.cartItem;
  const { quantity, isCheck } = props.cartItem;
  // dispatch(updateOrderSummary(quantity))

  const [product, setProduct] = useState({});

  const token = getTokenFromLocalStorage();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  useEffect(() => {
    (async () => {
      const product = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/id/${cartItem.productId}`,
        config
      );
      setProduct(product.data);
      dispatch(populateCartProducts(product.data));
    })();
  }, []);

  //when in cart page '-' or '+' btn is clicked as qty is changed
  useEffect(() => {
    (async () => {
      const cartToBeUpdated = {
        cartId: cartItem._id,
        quantity: quantity,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart/editCart`,
        cartToBeUpdated,
        config
      );
    })();
  }, [quantity]);

  const decreaseQty = () => {
    if (quantity > 1) {
      dispatch(
        updateQuantity({ cartId: cartItem._id, quantity: quantity - 1 })
      );
      dispatch(
        updateOrderLineQuantity({
          cartId: cartItem._id,
          quantity: quantity - 1,
        })
      );
    }
  };

  const removeFromCart = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cart/removeCart/${cartItem._id}`,
        config
      );
      dispatch(removeItemFromCart({ id: cartItem._id }));
      // --> dispatch order summary
    } catch (error) {
      //try catch nahuda error ayo. 'is not a function bhanera'
    }
  };

  const changeCheckStatus = async () => {
    if (isCheck) {
      dispatch(updateIsCheck({ id: cartItem._id, isCheck: false }));
      dispatch(removeOrderLine({ id: cartItem._id }));
      const cartToBeUpdated = {
        cartId: cartItem._id,
        isCheck: false,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart/toggleCheck`,
        cartToBeUpdated,
        config
      );
    } else {
      dispatch(updateIsCheck({ id: cartItem._id, isCheck: true }));
      dispatch(addOrderLine({ cartItem: cartItem }));
      const cartToBeUpdated = {
        cartId: cartItem._id,
        isCheck: true,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart/toggleCheck`,
        cartToBeUpdated,
        config
      );
    }
  };

  return (
    <div className="py-3 border-b border-slate-300">
      <div className="flex justify-between items-center sm:px-6">
        <div className="flex items-center w-[80%] sm:w-[60%] justify-between lg:w-[70%]">
          {(product.stock === 0 || checkExpiry(product.expiry)) ? (
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded-full bg-[#AAAAAA] border-none cursor-pointer`}
            ></div>
          ) : (
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 border-2 cursor-pointer rounded-full ${
                isCheck ? "bg-[#0075FF] border-none" : ""
              }`}
              onClick={() => changeCheckStatus()}
            ></div>
          )}
          <div className="flex items-center justify-center relative">
            <img
              src={product.productPicURL}
              alt=""
              className="w-[60px]  border rounded-md sm:w-[100px] "
            />
            {(product.stock === 0 || checkExpiry(product.expiry)) && (
              <p className="w-[60px] sm:w-[100px] text-xs sm:text-sm text-center bg-black opacity-75 mb-2 text-white absolute">
                Out of Stock
              </p>
            )}
          </div>
          <div className="w-1/2">
            <p className="my-2 font-medium">{product.pname}</p>
            <div className="flex">
              <p className="mr-3">Quantity:</p>
              <div className="flex items-center">
                <div
                  className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md mr-3 cursor-pointer"
                  onClick={() => {
                    decreaseQty();
                  }}
                >
                  -
                </div>
                <p className="">{quantity}</p>
                <div
                  className={`${
                    quantity === 10 || quantity === product.stock
                      ? "bg-[#6a828e]"
                      : "bg-[#37474F]"
                  }  text-white w-5 h-5 ml-3 rounded-md flex items-center justify-center cursor-pointer`}
                  onClick={() => {
                    if (quantity < 10 && quantity < product.stock) {
                      dispatch(
                        updateQuantity({
                          cartId: cartItem._id,
                          quantity: quantity + 1,
                        })
                      );
                      dispatch(
                        updateOrderLineQuantity({
                          cartId: cartItem._id,
                          quantity: quantity + 1,
                        })
                      );
                    }
                  }}
                >
                  +
                </div>
              </div>
            </div>
            <div className="sm:hidden">
              {product.discountPct > 0 && (
                <p className="my-2">
                  <strike>Rs. {product.price}</strike> -{product.discountPct}%
                </p>
              )}
              <p className="text-[#E25247]">Rs. {(product?.offerPrice)?.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:w-[28%] sm:justify-between">
          <div className="hidden sm:block">
            {product.discountPct > 0 && (
              <p className="text-[#7A7A7A]">
                <strike>Rs. {product.price}</strike> -{product.discountPct}%
              </p>
            )}
            <p className="text-[#E25247]">Rs. {product.offerPrice}</p>
          </div>
          <img
            src={close}
            alt=""
            className="w-[25px] cursor-pointer"
            onClick={() => {
              removeFromCart();
            }}
          />
        </div>
      </div>
      {product.stock <= 10 && product.stock !== 0 && (
        <p className="text-sm text-center mb-2 text-gray-500  mt-2 ]">
          Only {product.stock} items left! Get yours fast.
        </p>
      )}
    </div>
  );
};

export default CartItem;
