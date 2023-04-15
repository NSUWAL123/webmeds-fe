import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPrescriptionOrder from "../components/admin/order/UserPrescriptionOrder";
import ViewPrescriptionModal from "../components/admin/order/ViewPrescriptionModal";
import { populatePrescription } from "../redux/uploadPrescriptionSlice";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import { getTokenFromLocalStorage } from "../utils/handleToken";

const PrescriptionOrderPage = () => {
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/prescription/getPrescriptionByUser`,
        config
      );
      console.log(" data " + data)
      if (Array.isArray(data)) {
        dispatch(populatePrescription(data));
      }
    })();
  }, []);
  const prescriptions = useSelector((state) => state.uploadPrescription);

  //four different delivery states
  const delOptions = {
    request: "request",
    quotation: "quotation",
    pending: "pending",
    processed: "processed",
    ofd: "ofd",
    delivered: "delivered",
  };
  const [delState, setDelState] = useState(delOptions.quotation);

  const filteredPrescriptions = prescriptions?.filter((prescription) =>  {
    if (delState === delOptions.request) {
      return prescription.deliveryStatus === delOptions.request
    }
    if (delState === "quotation") {
      return (
        prescription.deliveryStatus === delOptions.pending &&
        prescription.isPriceAccepted === "pending"
      );
    }
    return prescription.deliveryStatus === delState && prescription.isPriceAccepted === "accepted";
  });

  return (
    <div className="relative">
      <ProtectedRoutes />
      <div className="w-full ">
        <button
          className={`${
            delState === delOptions.request
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400 border-[2px] "
          }  px-1 py-1 border-[2px] `}
          onClick={() => setDelState(delOptions.request)}
        >
          Order Request
        </button>
        <button
          className={`${
            delState === delOptions.quotation
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400 border-[2px] "
          }  px-1 py-1 border-[2px] `}
          onClick={() => setDelState(delOptions.quotation)}
        >
          Quotations
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
          Processed
        </button>
        <button
          className={`${
            delState === delOptions.ofd
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400"
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.ofd)}
        >
          To Recieve
        </button>
        <button
          className={`${
            delState === delOptions.delivered
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400"
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.delivered)}
        >
          Delivered
        </button>
      </div>

      <div>
        {filteredPrescriptions?.map((order) => {
          return (
            <UserPrescriptionOrder
              delState={delState}
              delOptions={delOptions}
              key={order._id}
              order={order}
            />
          );
        })}
      </div>
      {filteredPrescriptions?.length === 0 && (
        <p className="text-[#7b7b7b] font-semibold text-2xl h-[400px] flex items-center justify-center">Nothing to display here!</p>
      )}
    </div>
  );
};

export default PrescriptionOrderPage;
