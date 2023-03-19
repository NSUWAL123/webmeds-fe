import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import addSym from "../../pictures/icons/add-symbol.svg";
import { initiatePresOrder } from "../../redux/uploadPrescriptionSlice";
import { getTokenFromLocalStorage } from "../../utils/handleToken";
import Loading from "../Loading";
import AddressModal from "./AddressModal";
import ThankYouOrdering from "./ThankYouOrdering";

const AcceptQuotationModal = (props) => {
  const { billingAddress } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState("khalti");
  const [toggleDiv, setToggleDiv] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setShowAQModal, order } = props;
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  let khalticonfig = {
    publicKey: process.env.REACT_APP_KHALTI_PUBLIC_KEY,
    productIdentity: process.env.REACT_APP_KHALTI_SECRET_KEY,
    productName: "webmeds",
    productUrl: "http://localhost:3000/",
    eventHandler: {
      async onSuccess(payload) {
        setLoading(true)
        
        await axios.post(
          "http://localhost:5000/payment/initiatePayment",
          payload
        );

        const updatedOrder = {
          ...order,
          isPriceAccepted: "accepted",
          paymentType: "khalti",
          paymentStatus: true,
        };

        await axios.post(
          "http://localhost:5000/prescription/initiateOrder",
          updatedOrder,
          config
        );
        console.log(updatedOrder);
        sideeffects();
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const sideeffects = async () => {
    // dispatch(initiatePresOrder(updatedOrder));
    setLoading(false);
    setToggleDiv(false);
  };

  const acceptQuotation = async () => {
    const { quotedPrice } = order;
    // console.log(order);
    // if khalti or cod check
    if (paymentType === "khalti") {
      let checkout = new KhaltiCheckout(khalticonfig);
      checkout.show({ amount: parseInt((quotedPrice + 50) * 100)});
      return;
    } else {
      const updatedOrder = {
        ...order,
        isPriceAccepted: "accepted",
        paymentType: "cod",
        paymentStatus: false,
      };

      await axios.post(
        "http://localhost:5000/prescription/initiateOrder",
        updatedOrder,
        config
      );
    }
    sideeffects();
  };

  return (
    <div>
      {/* modal */}
      {toggleDiv ? (
        <div className="">
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-[400px]">
                  <div className="bg-white rounded-md p-6 h-[350px] flex flex-col justify-between mb-6">
                    <h1 className="text-[22px] font-medium">
                      Your Billing Details
                    </h1>
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
                        className="border w-full p-1"
                        onChange={(e) => setPaymentType(e.target.value)}
                      >
                        {/* <option value="cod">Cash on Delivery</option> */}
                        <option value="khalti">Khalti</option>
                      </select>
                    </div>
                    <p className="text-xs text-[#8d8d8d] font-medium">*Only pre-prepayments available</p>
                    {showModal && <AddressModal setShowModal={setShowModal} />}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        // saveAddress();
                        acceptQuotation();
                      }}
                    >
                      Confirm Order
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setShowAQModal(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ThankYouOrdering />
      )}
      {loading && <Loading/>}
      {/* {showThankyou && <ThankYouOrdering />} */}
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default AcceptQuotationModal;
