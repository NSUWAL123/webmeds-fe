import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/cartSlice";
import back from "../../pictures/icons/back.svg";
import addSym from "../../pictures/icons/add-symbol.svg";
import CartSummary from "./CartSummary";
import AddressModal from "../modals/AddressModal";
import PlaceOrderModal from "../modals/PlaceOrderModal";
import khaltilogo from "../../pictures/logo/khaltilogo.png"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../utils/Toast";

const CartBilling = () => {
  const dispatch = useDispatch();
  const { billingAddress } = useSelector((state) => state.user);
  const [paymentType, setPaymentType] = useState("cod");

  //showing modals
  const [showModal, setShowModal] = useState(false);
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);

  const { orderLine, orderSummary } = useSelector((state) => state.cart);

  const placeOrder = () => {
    if (!billingAddress) {
      notifyError("No billing address added yet!");
      return;
    }
    setShowPlaceOrderModal(true);
  };

  return (
    <div>
      <div className="flex mb-4 items-center">
        <img src={back} alt="" />
        <p
          onClick={() => dispatch(toggleCart(false))}
          className="cursor-pointer ml-2 font-medium text-gray-500"
        >
          Revise My Order
        </p>
      </div>

      <div className="lg:flex lg:justify-between">
        {/* YOUR BILLING DETAILS CONTAINER */}
        <div className="bg-white rounded-md p-6 h-[350px] flex flex-col justify-between mb-6 lg:w-[60%]">
          <h1 className="text-[22px] font-medium">Your Billing Details</h1>
          <div onClick={() => setShowModal(true)}>
            <p className="font-medium mb-2">Address:</p>
            <div className="w-[100%] rounded-sm outline-none pl-2 h-32 border flex justify-center items-center cursor-pointer">
              {billingAddress ? (
                <p>{billingAddress}</p>
              ) : (
                <img src={addSym} alt="" />
              )}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Payment Option:</p>
            <select
              name=""
              id=""
              className="border w-full p-1 outline-none"
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="khalti">Khalti</option>
            </select>
          </div>
          {paymentType === "khalti" && (
            <div className="flex items-center">
              <p className="text-xs text-[#AAAAAA] italic font-medium">*transaction limit upto 200 via </p>
              <img src={khaltilogo} alt="" className="w-[60px]"/>
            </div>
          )}
        </div>

        {/* ORDER SUMMARY DETAILS CONTAINER */}
        <div className="bg-white rounded-md p-6 lg:w-[35%]">
          <h1 className="text-[22px] font-medium">Order Summary</h1>
          {orderLine.map((order) => {
            return <CartSummary key={order._id} order={order} />;
          })}
          <div className="h-[175px] flex flex-col justify-around mt-2">
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
              <p>Rs. {(orderSummary.discount)?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Charge:</p>
              <p>Rs. {orderSummary.deliveryCharge}</p>
            </div>
            <div className="flex justify-between text-[#E25247] font-medium text-lg border-t border-gray-400 pt-1">
              <p>Grand Total:</p>
              <p>Rs.{(orderSummary.grandTotal)?.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#E25247] rounded-md mt-3 text-white px-5 py-1 text-lg font-medium"
              onClick={() => placeOrder()}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      {showModal && <AddressModal setShowModal={setShowModal} />}
      {showPlaceOrderModal && (
        <PlaceOrderModal
          setShowPlaceOrderModal={setShowPlaceOrderModal}
          paymentType={paymentType}
        />
      )}
      {/* {orderSuccess && <OrderSuccessModal/>} */}
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default CartBilling;
