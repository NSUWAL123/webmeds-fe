import React, { useState } from "react";

const Medicine = (props) => {
  const { med, setMedicine, removeMedicine, updateName, updateQty  } = props;
//   const [medName, setMedName] = useState("");
//   const [medQty, setMedQty] = useState("");
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
          <input
            type="text"
            className="outline-none border rounded-md w-full px-2"
            onChange={(e) => updateName(med.count, e.target.value)}
          />
        </div>
        <div>
          <p>Quantity:</p>
          <input
            type="number"
            className="outline-none border rounded-md w-1/6 px-2"
            onChange={(e) => updateQty(med.count, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Medicine;
