import React, { useEffect, useState } from "react";
import CartBilling from "../components/cart components/CartBilling";
import CartItem from "../components/cart components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProduct,
  populateCart,
  populateOrderLine,
  toggleCart,
  updateOrderSummary,
} from "../redux/cartSlice";
import axios from "axios";
import { config } from "../utils/config";

const CartPage = () => {
  const dispatch = useDispatch();

  const { cartItems, toggle, orderLine, cartProducts, orderSummary } =
    useSelector((state) => state.cart);
  useEffect(() => {
    (async () => {
      const fetchCart = await axios.get(
        "http://localhost:5000/cart/getCartItems",
        config
      );
      dispatch(populateCart(fetchCart.data.getCart));
      dispatch(populateOrderLine(fetchCart.data.getCart));
      window.scrollTo(0, 0);
    })();
  }, [cartItems.length, toggle]);

  let qty = 0;
  let price = 0;
  let offeredPrice = 0;

  if (orderLine.length > 0 && cartProducts.length > 0) {
    for (let i = 0; i < orderLine.length; i++) {
      let product = "";
      for (let j = 0; j < cartProducts.length; j++) {
        if (cartProducts[j]._id === orderLine[i].productId) {
          product = cartProducts[j];
        }
      }

      qty = qty + orderLine[i].quantity;
      price = price + orderLine[i].quantity * product.price;
      offeredPrice = offeredPrice + orderLine[i].quantity * product.offerPrice;
    }
  } else {
  }

  let discount = price - offeredPrice;
  let grandTotal = price - discount;

  useEffect(() => {
    dispatch(
      updateOrderSummary({
        totalItems: qty,
        orderTotal: price,
        discount: discount,
        grandTotal: grandTotal,
      })
    );
  }, [qty, price, discount, grandTotal, offeredPrice]);

  // console.log(orderLine)
  //   console.log(orderSummary)

  return (
    <div>
      {!toggle ? (
        <div className="flex flex-col lg:flex-row">
          {/* div for cart items */}
          <div className="bg-white mb-5 py-3 px-5 sm:px-6 rounded-md lg:w-[70%] lg:mr-10">
            {cartItems.length === 0 ? (
              <div className="flex justify-center items-center h-[100%]"> 
                <p className="text-[20px] font-semibold lg:text-[28px]">No products added to cart to display</p>
              </div>
            ) : (
              <>
                <h1 className="text-[20px] font-semibold lg:text-[24px]">
                  Your Cart Items
                </h1>
                <div>
                  {cartItems.map((cartItem) => {
                    return <CartItem key={cartItem._id} cartItem={cartItem} />;
                  })}
                </div>
              </>
            )}
          </div>

          {/* div for order summary  */}
          <div className="bg-white mb-5 py-3 px-8 sm:px-12 rounded-md h-[280px] flex flex-col justify-around lg:px-3 lg:w-[30%] xl:px-6">
            <h1 className="text-[20px] font-semibold lg:text-[24px]">
              Order Summary
            </h1>

            <div className="h-[72%] flex flex-col justify-around">
              <div className="flex justify-between">
                <p>Total Items:</p>
                <p>{orderSummary.totalItems}</p>
              </div>
              <div className="flex justify-between">
                <p>Order Total:</p>
                <p>Rs. {orderSummary.orderTotal}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount:</p>
                <p>Rs. {orderSummary.discount}</p>
              </div>
              <div className="flex justify-between pb-2 border-b-2 border-slate-300">
                <p>Delivery Charge:</p>
                <p>Rs. {orderSummary.deliveryCharge}</p>
              </div>
              <div className="flex justify-between text-[#E25247] font-medium">
                <p>Grand Total</p>
                <p>Rs. {orderSummary.grandTotal}</p>
              </div>
            </div>
            <div className="flex justify-center">
              {(orderSummary.totalItems === 0) ? (
                <button
                className="bg-[#e38b85] text-white px-5 py-1  rounded-md cursor-not-allowed"
                onClick={() => dispatch(toggleCart(true))}
                disabled
              >
                Checkout
              </button>
              ) : (              
              <button
                className="bg-[#E25247] text-white px-5 py-1  rounded-md"
                onClick={() => dispatch(toggleCart(true))}                
              >
                Checkout
              </button>
              ) }
            </div>
          </div>
        </div>
      ) : (
        //A new section which shows up whenever "Checkout" button is clicked
        <CartBilling />
      )}
    </div>
  );
};

export default CartPage;
