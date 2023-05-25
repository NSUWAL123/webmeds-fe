import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import eye from "../../../pictures/icons/eyeopen.svg";
import { setShowPrescription } from "../../../redux/prescriptionSlice";
import AcceptQuotationModal from "../../modals/AcceptQuotationModal";
import ViewPrescriptionModal from "./ViewPrescriptionModal";
import khalti from "../../../pictures/logo/khaltilogo.png";
import axios from "axios";
import { declinePrescriptionOrder } from "../../../redux/uploadPrescriptionSlice";

const UserPrescriptionOrder = (props) => {
  const { order } = props;
  const dispatch = useDispatch();
  const { showPrescription } = useSelector((state) => state.prescriptionOrder);
  const [showAQModal, setShowAQModal] = useState(false);
  const [ord, setOrd] = useState({});

  const declineOrder = async () => {
    const state = {
      id: order._id,
    };
    const deletePrescription = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/prescription/deletePrescriptionOrder/${order._id}`
    );
    dispatch(declinePrescriptionOrder(state));
  };

  return (
    <div className="flex flex-col justify-around bg-[#ffffff] mt-6 px-5 rounded-lg py-3">
      <div className="h-[55px] md:h-[25px] flex flex-col justify-around md:flex-row md:justify-between">
        <p>
          <span className="font-medium">Placed on: </span>
          {order.date.split("T")[0]}
        </p>
      </div>

      <div className="md:flex">
        <div className="h-[275px] flex flex-col items-center justify-around w-full md:w-[35%]">
          <div className="h-[200px] w-[200px] rounded-md overflow-hidden flex items-center justify-center">
            <img src={order.prescriptionPicURL} alt="" className="" />
          </div>
          <button
            className="flex items-center bg-[#FFC655] hover:bg-[#fecd6a] w-fit px-2 py-1 rounded-md"
            onClick={() => {
              dispatch(setShowPrescription({ setTo: true, id: "" }));
              setOrd({});
              setOrd(order);
              // setImgURL(order.prescriptionPicURL)
            }}
          >
            <img src={eye} alt="" className="mr-2" />
            <p>View Prescription</p>
          </button>
        </div>

        <div className="md:w-[65%]">
          <p>
            <span className="font-medium ">Doctor's Name: </span>
            {order.doctorName}
          </p>
          <p>
            <span className="font-medium">NMC Number: </span>
            {order.doctorNMC}
          </p>
          <p className="font-semibold my-1">Medicines:</p>
          <table className="w-full">
            <tbody>
              <tr className="bg-[#37474F] text-white">
                <th className="font-medium border border-gray-500">SN</th>
                <th className="font-medium border border-gray-500">
                  Medicine Name
                </th>
                <th className="font-medium border border-gray-500">Quantity</th>
              </tr>
              {order.medicines.map((medicine, i) => {
                return (
                  <tr
                    key={medicine.count}
                    className="even:bg-[#F2F2F2] odd:bg-[#ffffff] hover:bg-[#DDDDDD]"
                  >
                    <td className="border text-center border-gray-500">
                      {i + 1}.
                    </td>
                    <td className="border text-center border-gray-500">
                      {medicine.medName}
                    </td>
                    <td className="border text-center border-gray-500">
                      {medicine.medQty}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-2">
            <span className="font-medium">Note: </span>
            {order.note}
          </p>
          {/* IF NOT REQUEST, ADD DESC, MEDICINES, PRICE TO THE BOTTOM*/}
          {order.deliveryStatus !== "request" && (
            <div className="mt-1">
              <div>
                <p className="mt-1">
                  <span className="font-medium ">Description: </span>
                  {order.description}
                </p>
              </div>
              <div>
                <p className="mt-1 text-[#E25247]  font-semibold">
                  <span className="font-medium">Price: </span>Rs.{" "}
                  {order.quotedPrice}
                  <span className="italic font-medium text-xs text-[#AAAAAA]">
                    {" "}
                    *excluding Rs.50 delivery charge
                  </span>
                </p>
                {order.isPriceAccepted === "accepted" && (
                  <div className="flex items-center">
                    <p className="text-xs italic text-[#AAAAAA] font-medium">
                      *Paid via{" "}
                    </p>
                    <img src={khalti} alt="" className="w-[60px]" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {order.deliveryStatus === "pending" &&
        order.isPriceAccepted === "pending" && (
          <div className="flex justify-around mt-4 md:border-t-[1px] md:border-slate-300 md:pt-2">
            <button
              className="bg-[#E25247] hover:bg-[#fb5d52] text-white px-2 py-1 rounded-md m-2"
              onClick={() => declineOrder()}
            >
              Decline
            </button>
            <button
              className="bg-[#3ad192] hover:bg-[#32de96]  text-white px-2 py-1 rounded-md m-2"
              onClick={() => setShowAQModal(true)}
            >
              Accept Quotation
            </button>
          </div>
        )}
      {showPrescription.show && (
        <div className="fixed w-[89%] top-0 h-full flex justify-center items-center mt-8">
          <ViewPrescriptionModal order={ord} />
        </div>
      )}
      {showAQModal && (
        <AcceptQuotationModal setShowAQModal={setShowAQModal} order={order} />
      )}
    </div>
  );
};

export default UserPrescriptionOrder;
