import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { addAddress } from "../../redux/userSlice";
import { config } from "../../utils/config";
import { notifyError } from "../../utils/Toast";

const AddressModal = (props) => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setShowModal } = props;

  const [province, setProvince] = useState("Bagmati");
  const [district, setDistrict] = useState("Kathmandu");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");

  const saveAddress = async () => {
    if (!area | !landmark) {
      notifyError("Please provide full address details!")
      return;
    }

    const billingAddress = province + " province, " + district + ", " + area + ", " + landmark;

    const user = await axios.post(
      "http://localhost:5000/user/update-address/",
      {
        billingAddress: billingAddress,
      },
      config
    );

    dispatch(addAddress(billingAddress))
    setShowModal(false);

  };

  return (
    <div>
      {/* modal */}
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-center">
                        <h3
                          className="text-lg font-medium leading-6 text-gray-900 text-[23px]"
                          id="modal-title"
                        >
                          Add Address
                        </h3>
                      </div>

                      <div className="mt-2">
                        <div className="w-[100%] h-[295px] flex flex-col justify-around">
                          <div className="flex flex-col items-start">
                            <p className="mb-1">Province:</p>
                            <select
                              name=""
                              id=""
                              className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                              onChange={(e) => {
                                setProvince(e.target.value);
                              }}
                            >
                              <option value="Bagmati">Bagmati</option>
                            </select>
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="mb-1">District:</p>
                            <select
                              name=""
                              id=""
                              className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                              onChange={(e) => setDistrict(e.target.value)}
                            >
                              <option value="Kathmandu">Kathmandu</option>
                              <option value="Lalitpur">Lalitpur</option>
                              <option value="Bhaktapur">Bhaktapur</option>
                            </select>
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="mb-1">Area:</p>
                            <input
                              type="text"
                              className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                              onChange={(e) => {
                                setArea(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="mb-1">Landmark:</p>
                            <input
                              type="text"
                              className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                              onChange={(e) => {
                                setLandmark(e.target.value);
                              }}
                            />
                          </div>
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
                      saveAddress();
                    }}
                  >
                    Save & Close
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setShowModal(false);
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
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default AddressModal;
