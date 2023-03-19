import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

var override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  const [loading, setLoading] = useState(true);
  return (
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
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg flex justify-center h-[200px]">
              <div className="flex items-center">
                <ClipLoader
                  color="#31D490"
                  loading={loading}
                  size={25}
                  speedMultiplier={1}
                />
                <p className="text-[#5D94E7] text-3xl ml-4">Loading</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
