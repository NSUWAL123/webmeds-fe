import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrescriptionOrder from "../../components/admin/order/PrescriptionOrder";
import ViewPrescriptionModal from "../../components/admin/order/ViewPrescriptionModal";
import { populatePrescriptionOrder } from "../../redux/prescriptionSlice";

const ManagePrescriptionOrders = () => {
  const dispatch = useDispatch();
  const { prescription, showRespondModal, showPrescription } = useSelector(
    (state) => state.prescriptionOrder
  );
  console.log(prescription);

  const delOptions = {
    request: "request",
    pending: "pending",
    processed: "processed",
    ofd: "ofd",
    delivered: "delivered",
  };
  const [delState, setDelState] = useState(delOptions.request);
  const filteredOrder = prescription.filter(
    (order) => order.deliveryStatus === delState
  );
  console.log(filteredOrder);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //   getAllPrescriptionOrders
  useEffect(() => {
    (async () => {
      let response = await axios.get(
        "http://localhost:5000/prescription/getAllPrescriptionOrders"
      );
      let { data } = response;

      console.log(data);
      dispatch(populatePrescriptionOrder(data));
    })();
  }, []);

  return (
    <div className="relative">
      <div className="w-full">
        <button
          className={`${
            delState === delOptions.request
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400 border-[2px] "
          }  px-1 py-1 border-[2px] `}
          onClick={() => setDelState(delOptions.request)}
        >
          Request
        </button>
        <button
          className={`${
            delState === delOptions.pending
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400 border-[2px] "
          }  px-1 py-1 border-[2px] `}
          onClick={() => setDelState(delOptions.pending)}
        >
          Pending
        </button>
        <button
          className={`${
            delState === delOptions.processed
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400 "
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.processed)}
        >
          To be Delivered
        </button>
        <button
          className={`${
            delState === delOptions.ofd
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400"
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.ofd)}
        >
          Out for Delivery
        </button>
      </div>
      <div>
        {filteredOrder.map((order) => {
          return (
            <PrescriptionOrder
              delState={delState}
              delOptions={delOptions}
              key={order._id}
              order={order}
            />
          );
        })}
      </div>
      {/* top-[140px] */}
      {showPrescription.show && (
        <div className="fixed w-[89%] top-0 h-full flex justify-center items-center mt-8">
          <ViewPrescriptionModal />
        </div>
      )}
    </div>
  );
};

export default ManagePrescriptionOrders;
