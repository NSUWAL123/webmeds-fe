import React, { useState } from "react";

const Medicine = (props) => {
  const { med, setMedicine, removeMedicine, updateName, updateQty } = props;
  console.log(med);
  const [medQty, setMedQty] = useState(med.medQty);
  console.log(medQty);
  return (
    <div
      className="bg-[#FFC655] px-3 rounded-md flex flex-col justify-around mb-4 pb-2"
      key={med.count}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium">Medicine {med.count}:</p>
        <button
          className=" text-[#E25247] rounded-full font-semibold text-4xl"
          onClick={() => removeMedicine(med.count)}
        >
          -
        </button>
      </div>
      <div className="flex flex-col h-[120px] justify-around">
        <div>
          <p>Name:</p>
          {/* med.count is id for the particular medicine */}
          <input
            type="text"
            className="outline-none border rounded-md w-full px-2"
            onChange={(e) => updateName(med.count, e.target.value)}
          />
        </div>
        <div>
          <p>Quantity:</p>
          <div className="flex items-center">
            <div
              className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md  ml-3 cursor-pointer"
              onClick={() => {
                if (medQty > 1) {
                  updateQty(med.count, medQty - 1);
                  setMedQty(medQty - 1);
                }
              }}
            >
              -
            </div>

            <p className="bg-slate-100 w-7 h-7 rounded-md text-center mx-3">
              {medQty}
            </p>
            <div
              className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md cursor-pointer"
              onClick={() => {
                if (medQty < 10) {
                  updateQty(med.count, medQty + 1);
                  setMedQty(medQty + 1);
                }
              }}
            >
              +
            </div>
          </div>
        </div>

        
      </div>
      {medQty===10 && (<p className="text-sm mt-1 text-red-600">Max limit is 10!</p>)}
    </div>
  );
};

export default Medicine;
