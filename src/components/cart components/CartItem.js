import React, { useEffect, useState } from "react";
import close from "../../pictures/icons/close.svg";
import axios from "axios";
import { config } from "../../utils/config";
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

const CartItem = (props) => {
  const dispatch = useDispatch();

  const cartItem = props.cartItem;
  const { quantity, isCheck } = props.cartItem;
  // dispatch(updateOrderSummary(quantity))

  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const product = await axios.get(
        `http://localhost:5000/products/id/${cartItem.productId}`,
        config
      );
      setProduct(product.data);
      dispatch(populateCartProducts(product.data))
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
        "http://localhost:5000/cart/editCart",
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
      dispatch(updateOrderLineQuantity({
        cartId: cartItem._id,
        quantity: quantity - 1,
      }))
    }
  };

  const removeFromCart = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/cart/removeCart/${cartItem._id}`,
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
        `http://localhost:5000/cart/toggleCheck`,
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
        `http://localhost:5000/cart/toggleCheck`,
        cartToBeUpdated,
        config
      );
    }
  };

  

  return (
    <div className="flex justify-between items-center py-4 border-b border-slate-300 sm:px-6">
      <div className="flex items-center w-[80%] sm:w-[60%] justify-between lg:w-[70%]">
        {/* checkbox */}
        {/* <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5" id="check" name="check"/> */}
        <div
          className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded-full\ ${
            isCheck ? "bg-[#0075FF] border-none" : ""
          }`}
          onClick={() => changeCheckStatus()}
        ></div>
        <img
          src={product.productPicURL}
          alt=""
          className="w-[60px] h-[60px] border rounded-md sm:w-[100px] sm:h-[100px]"
        />
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
                className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md  ml-3 cursor-pointer"
                onClick={() => {
                  // setQuantity(quantity + 1);
                  dispatch(
                    updateQuantity({
                      cartId: cartItem._id,
                      quantity: quantity + 1,
                    })
                  );
                  dispatch(updateOrderLineQuantity({
                    cartId: cartItem._id,
                    quantity: quantity + 1,
                  }))
                }}
              >
                +
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            <p className="my-2">
              <strike>Rs. {product.price}</strike> -{product.discountPct}%
            </p>
            <p className="text-[#E25247]">Rs. {product.offerPrice}</p>
          </div>
        </div>
      </div>

      <div className="sm:flex sm:w-[28%] sm:justify-between">
        <div className="hidden sm:block">
          <p className="text-[#7A7A7A]">
            <strike>Rs. {product.price}</strike> -{product.discountPct}%
          </p>
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
  );
};

export default CartItem;
