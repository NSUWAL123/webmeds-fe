import React, { useState } from "react";

const UploadPrescriptionPage = () => {
  //files --------------------//
  const [disabled, setDisabled] = useState(true);

  const condition = () => {
    disabled ? setDisabled(false) : setDisabled(true);
  }

  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    if (!e.target.value) {
      return;
    }

    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader(); //method provided by js to read file
    reader.readAsDataURL(file); //reads file as data url (base64 encoding)
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    <div className="flex justify-center">
      <div className="w-[98%] bg-white px-6 py-6 md:w-[600px] rounded-sm">

        <div className="w-full flex justify-center text-[22px] mb-2">
          <h1 className="font-semibold">Upload Prescription</h1>
        </div>

        {/* bottom container */}
        <div className="h-[480px] flex flex-col justify-around">
          <div className="flex flex-col">
            <p className="mb-1 text-[#37474F] font-medium ">
              Add Prescription:
            </p>
          </div>

          <div className="flex justify-center mb-2">
            {previewSource ? (
              <div className="">
                <img
                  src={previewSource}
                  alt=""
                  srcset=""
                  className="h-[150px] bg-red-300 border-[1px] border-[#37474F]"
                />
              </div>
            ) : (
              <div className="h-[150px] w-[150px] bg-[#ffffff] border-[#37474F] border-[1px] flex  flex-col items-center justify-center text-sm">
                <p>No photo</p>
                <p>to preview</p>
              </div>
            )}
          </div>

          <div className="">
            <input
              type="file"
              className="w-[100%]"
              //onChange={(e) => setPicture(e.target.value)}
              onChange={handleFileInputChange}
              accept="image/png, image/gif, image/jpeg"
              
            />
          </div>

          <div>
            <p className="text-[#37474F] font-medium">Doctor's Name:</p>
            <input type="text" className="border w-full" />
          </div>

          <div>
            <p className="text-[#37474F] font-medium">Add a Note:</p>
            <input type="text" className="border w-full" />
          </div>

          <div className="flex w-full items-center">
            <input type="checkbox" name="" id="" className="w-6" onClick={() => condition()}/>
            <p>Above information are correct.</p>
          </div>

          <div className="flex justify-center">
            <button className={` text-white px-3 py-1 rounded-md ${disabled ? "cursor-not-allowed bg-[#5f8ea5]" : "bg-[#37474F]"}`}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPrescriptionPage;
