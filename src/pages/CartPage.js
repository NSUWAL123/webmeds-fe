import React from "react";
import CartBilling from "../components/cart components/CartBilling";
import CartItem from "../components/cart components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      {!cart.toggle ? (
        <div className="flex flex-col lg:flex-row">
          {/* div for cart items */}
          <div className="bg-white mb-5 py-3 px-5 sm:px-6 rounded-md lg:w-[70%] lg:mr-10">
            <h1 className="text-[20px] font-semibold lg:text-[24px]">
              Your Cart Items
            </h1>
            <div>
              <CartItem />
              <CartItem />
            </div>
          </div>

          {/* div for order summary  */}
          <div className="bg-white mb-5 py-3 px-8 sm:px-12 rounded-md h-[280px] flex flex-col justify-around lg:px-3 lg:w-[30%] xl:px-6">
            <h1 className="text-[20px] font-semibold lg:text-[24px]">
              Order Summary
            </h1>

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
              <button
                className="bg-[#E25247] text-white px-5 py-1  rounded-md"
                onClick={() => dispatch(toggleCart(true))}
              >
                Checkout
              </button>
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
