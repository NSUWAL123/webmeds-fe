import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  changePrescriptionOrderState,
  setShowRespondModal,
} from "../../../redux/prescriptionSlice";
import ViewPrescriptionModal from "./ViewPrescriptionModal";
import { notifyError, notifySuccess } from "../../../utils/Toast";
import axios from "axios";

const RespondModal = () => {
  const dispatch = useDispatch();
  const { prescription, showRespondModal, showPrescription } = useSelector(
    (state) => state.prescriptionOrder
  );
  const [price, setPrice] = useState("");
  const [medicines, setMedicines] = useState("");
  const [description, setDescription] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const sendQuotation = async () => {
    if (!price || !medicines || !description) {
      notifyError("Empty Fields!!");
      return;
    }

    const prescription = await axios.put(
      `http://localhost:5000/prescription/updateStatus`, {id: showRespondModal.id, medicines: medicines, description: description, price: price, deliveryStatus: "pending"},
      config
    );

    dispatch(
      changePrescriptionOrderState({
        id: showRespondModal.id,
        deliveryStatus: "pending",
      })
    );

    console.log(price, medicines, description);
    notifySuccess("Quotation sent to the user.");
  };

  return (
    <div className="">
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-slate-500 bg-opacity-5 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-[80%]">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    ></h3>
                    <div className="mt-2">
                      <div className="mb-4 flex flex-col">
                        <p className="mb-1 font-medium">Medicines:</p>
                        <input
                          type="text"
                          className="border p-1"
                          onChange={(e) => {
                            setMedicines(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-4 flex flex-col">
                        <p className="mb-1 font-medium">Total Price:</p>
                        <input
                          type="text"
                          className="border p-1"
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="mb-1 font-medium">Description:</p>
                        <textarea
                          type="text"
                          rows="3"
                          className="border w-full p-1 text resize-none rounded-sm outline-none pl-2"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    sendQuotation();
                  }}
                >
                  Send Quotation
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    dispatch(setShowRespondModal({ setTo: false, id: "" }));
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default RespondModal;
