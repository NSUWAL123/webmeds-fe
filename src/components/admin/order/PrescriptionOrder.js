import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import eye from "../../../pictures/icons/eyeopen.svg";
import { setShowPrescription } from "../../../redux/prescriptionSlice";
import ViewPrescriptionModal from "./ViewPrescriptionModal";

const PrescriptionOrder = (props) => {
  const { delState, delOptions, order } = props;
  const [user, setUser] = useState({});
  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    (async () => {
      let userId = order.userId;
      const user = await axios.get(
        `http://localhost:5000/user/getUserById/${userId}`,
        config
      );
      setUser(user.data);
    })();
  }, []);

  console.log(order._id);

  return (
    <div className="flex flex-col justify-around bg-[#DCF2FB] mt-6 px-5 rounded-lg py-3">
      <div className="h-[55px] md:h-[25px] flex flex-col justify-around md:flex-row md:justify-between">
        <p>
          <span className="font-medium">Placed on:</span>{" "}
          {order.date.split("T")[0]}
        </p>
        <p>
          <span className="font-medium">Placed by:</span> {user.name}
        </p>
      </div>

      <div className="md:flex">
        <div className="h-[275px] flex flex-col items-center justify-around w-full md:w-[35%]">
          <img
            src={order.prescriptionPicURL}
            alt=""
            className="h-[200px] w-[200px] rounded-md"
          />
          <button
            className="flex items-center bg-[#FFC655] hover:bg-[#fecd6a] w-fit px-2 py-1 rounded-md"
            onClick={() =>
              dispatch(setShowPrescription({ setTo: true, id: order._id }))
            }
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
            <span className="font-medium">NMC Number:</span>
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
        </div>
      </div>

      <div className="flex justify-around mt-4 md:border-t-[1px] md:border-slate-400 md:pt-2">
        <button className="bg-[#E25247] hover:bg-[#fb5d52] text-white px-2 py-1 rounded-md m-2">
          Decline
        </button>
        <button className="bg-[#3ad192] hover:bg-[#32de96]  text-white px-2 py-1 rounded-md m-2">
          Respond
        </button>
      </div>
    </div>
  );
};

export default PrescriptionOrder;
