import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import confirm from "../../pictures/icons/confirm.svg";
import {
  confirmOrder,
  removeItemFromCart,
  setOrderSuccess,
  toggleCart,
} from "../../redux/cartSlice";
import ordersucess from "../../pictures/photo/ordersuccess.svg";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/handleToken";
import KhaltiCheckout from "khalti-checkout-web";
import ThankYouOrdering from "./ThankYouOrdering";
import Loading from "../Loading";

const PlaceOrderModal = (props) => {
  const [toggleDiv, setToggleDiv] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setShowPlaceOrderModal, paymentType } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { billingAddress } = useSelector((state) => state.user);
  const { orderLine, cartProducts, orderSummary, finalOrder, orderSuccess } =
    useSelector((state) => state.cart);

  const token = getTokenFromLocalStorage();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };
  let order = {
    orderLine,
    ...orderSummary,
    billingAddress,
    paymentType,
    paymentStatus: false,
    deliveryStatus: "pending",
  };

  let khalticonfig = {
    publicKey: process.env.REACT_APP_KHALTI_PUBLIC_KEY,
    productIdentity: process.env.REACT_APP_KHALTI_SECRET_KEY,
    productName: "webmeds",
    productUrl: "http://localhost:3000/",
    eventHandler: {
      async onSuccess(payload) {
        setLoading(true);
        
        await axios.post(
          "http://localhost:5000/payment/initiatePayment",
          payload
        );

        await axios.post(
          "http://localhost:5000/order/addOrder",
          { ...order, paymentStatus: true },
          config
        );
        sideeffects();
      },
      onError(error) {
      },
      onClose() {
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

  const placeOrder = async () => {
    if (paymentType === "khalti") {
      let checkout = new KhaltiCheckout(khalticonfig);
      checkout.show({ amount: parseInt(orderSummary.grandTotal * 100) });
      return;
    } else {
      const initiateOrder = await axios.post(
        "http://localhost:5000/order/addOrder",
        order,
        config
      );
    }
    sideeffects();
  };

  const sideeffects = async () => {
    //removes products from cart that has been ordered
    for (let i = 0; i < orderLine.length; i++) {
      const response = await axios.delete(
        `http://localhost:5000/cart/removeCart/${orderLine[i]._id}`,
        config
      );
      dispatch(removeItemFromCart({ id: orderLine[i]._id }));
    }
    //updates(decreases) qty of product when order
    for (let i = 0; i < orderLine.length; i++) {
      const response = await axios.post(
        "http://localhost:5000/admin/manage-product/updateQty",
        {
          id: orderLine[i].productId,
          qty: orderLine[i].quantity,
        }
      );
    }
    dispatch(confirmOrder(order));
    setLoading(false);
    setToggleDiv(false);
  };

  return (
    <>
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
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                        <img src={confirm} alt="" className=" h-12 w-12 " />
                      </div>

                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg font-medium leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Confirm Order?
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to place order? By confirming
                            this, your order will be placed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#37474F] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#48545a] focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        // deleteProduct(indproduct);
                        placeOrder();
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setShowPlaceOrderModal(false);
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
        <ThankYouOrdering/>
      )}
      {loading && <Loading/>}
    </>
  );
};

export default PlaceOrderModal;
