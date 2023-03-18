import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleCart } from '../../redux/cartSlice';
import ordersucess from "../../pictures/photo/ordersuccess.svg";


const ThankYouOrdering = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
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
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg flex flex-col items-center sm:h-[500px] justify-around p-5">
                  <h1 className="text-[#37474F] font-semibold text-3xl">
                    Order Successful
                  </h1>
                  <img src={ordersucess} alt="" />
                  <p className="text-gray-600 text-xl font-medium">
                    Your package will be delivered soon!
                  </p>
                  <p className="text-gray-600 text-xl font-medium">
                    Thankyou, for ordering from{" "}
                    <span className="text-[#5D94E7] font-semibold">web</span>
                    <span className="text-[#31D490] font-semibold">meds</span>!
                  </p>
                  <button
                    className="bg-[#E25247] hover:bg-[#e56359] text-white rounded-md px-4 py-1 mt-3"
                    onClick={() => {
                      navigate("/");
                      dispatch(toggleCart(false));
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ThankYouOrdering