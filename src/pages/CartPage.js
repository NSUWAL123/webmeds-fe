import React from "react";
import CartItem from "../components/cart components/CartItem";

const CartPage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* div for cart items */}
      <div className="bg-white mb-5 py-3 px-5 sm:px-6 rounded-md lg:w-[70%] lg:mr-10">
        <h1 className="text-[20px] font-semibold">Your Cart Items</h1>
        <div>
          <CartItem />
          <CartItem />
        </div>
      </div>

      {/* div for order summary  */}
      <div className="bg-white mb-5 py-3 px-8 sm:px-12 rounded-md h-[280px] flex flex-col justify-around lg:px-3 lg:w-[30%]">
        <h1 className="text-[20px] font-semibold">Order Summary</h1>

        <div className="h-[58%] flex flex-col justify-around">
          <div className="flex justify-between">
            <p>Total Items:</p>
            <p>3</p>
          </div>
          <div className="flex justify-between">
            <p>Order Total:</p>
            <p>Rs. 2334</p>
          </div>
          <div className="flex justify-between pb-2 border-b-2 border-slate-300">
            <p>Discount:</p>
            <p>Rs. 230</p>
          </div>
          <div className="flex justify-between text-[#E25247] font-medium">
            <p>Grand Total</p>
            <p>Rs. 2032</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-[#E25247] text-white px-5 py-1  rounded-md">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
