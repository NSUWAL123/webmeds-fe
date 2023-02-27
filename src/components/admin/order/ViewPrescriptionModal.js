import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../../pictures/icons/close.svg";
import { setShowPrescription } from "../../../redux/prescriptionSlice";

const ViewPrescriptionModal = () => {
  const { showPrescription } = useSelector((state) => state.prescriptionOrder);
  const dispatch = useDispatch();
  console.log(showPrescription.imgLink);
  return (
    <div className="bg-white pb-4 border border-black rounded-md shadow-2xl">
      <div className="flex justify-end py-2 mr-2">
        <img src={cross} alt="" onClick={() => dispatch(setShowPrescription({setTo: false, id: ""}))} className="cursor-pointer"/>
      </div>
      <div className="">
        <img src={showPrescription.imgLink} alt="" className="max-h-[500px]"/>
      </div>
    </div>
  );
};

export default ViewPrescriptionModal;
