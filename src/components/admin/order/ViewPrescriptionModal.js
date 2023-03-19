import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../../pictures/icons/close.svg";
import { setShowPrescription } from "../../../redux/prescriptionSlice";

const ViewPrescriptionModal = (props) => {
  let { order } = props;
  const { showPrescription } = useSelector((state) => state.prescriptionOrder);
  const dispatch = useDispatch();
  console.log("kina");

  return (
    <div className="bg-white pb-4 border border-black rounded-md shadow-2xl">
      <div className="flex justify-end py-2 mr-2">
        <img
          src={cross}
          alt=""
          onClick={() => {
            dispatch(setShowPrescription({ setTo: false, id: "" }));
            order={};
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="">
        {order && (
          <img
            src={order.prescriptionPicURL}
            alt=""
            className="max-h-[450px]"
          />
        )}
        <img src={showPrescription.imgLink} alt="" className="max-h-[500px]" />
      </div>
    </div>
  );
};

export default ViewPrescriptionModal;
