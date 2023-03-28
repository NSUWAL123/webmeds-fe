import React, { useEffect, useState, CSSProperties } from "react";
import Medicine from "../components/Medicine";
import add from "../pictures/icons/add-admin.svg";
import { clearForm } from "../utils/clearForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifyWarning, notifySuccess } from "../utils/Toast";
import { useSelector } from "react-redux";
import AddressModal from "../components/modals/AddressModal";
import addSym from "../../src/pictures/icons/add-symbol.svg";
import axios from "axios";
// imporitng react-spinners
import ClipLoader from "react-spinners/ClipLoader";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import { getTokenFromLocalStorage } from "../utils/handleToken";

var override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const UploadPrescriptionPage = () => {
  const [loading, setLoading] = useState(false);
  //files --------------------//
  const [disabled, setDisabled] = useState(true);
  const { billingAddress } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const condition = () => {
    disabled ? setDisabled(false) : setDisabled(true);
  };

  //prescription image
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

  const [count, setCount] = useState(1);
  const [medicine, setMedicine] = useState([
    { count: count, medName: "", medQty: 1 },
  ]);
  const [doctor, setDoctor] = useState("");
  const [NMC, setNMC] = useState("");
  const [note, setNote] = useState("");

  const addMedicine = async () => {
    setCount((count) => count + 1);
    setMedicine([...medicine, { count: count + 1, medName: "", medQty: 1 }]);
  };

  const removeMedicine = (id) => {
    setMedicine((current) =>
      current.filter((medicine) => medicine.count !== id)
    );
  };

  const updateName = (count, name) => {
    for (let i = 0; i < medicine.length; i++) {
      if (count === medicine[i].count) {
        medicine[i].medName = name;
      }
    }
  };

  const updateQty = (count, qty) => {
    for (let i = 0; i < medicine.length; i++) {
      if (count === medicine[i].count) {
        medicine[i].medQty = qty;
      }
    }
  };

  const clearFields = () => {
    setPreviewSource("");
    setDoctor("");
    setNMC("");
    setNote("");
    setCount(1);
    setMedicine([{ count: 1, medName: "", medQty: 1 }]);
  };

  const uploadPrescription = async () => {
    for (let i = 0; i < medicine.length; i++) {
      if (
        !medicine[i].medName ||
        !medicine[i].medQty ||
        !previewSource ||
        !doctor ||
        !NMC ||
        !note
      ) {
        notifyError("Empty Fields.");
        return;
      }
    }

    setLoading(true);
    const uploadData = {
      prescriptionPicURL: previewSource,
      doctorName: doctor,
      doctorNMC: NMC,
      medicines: medicine,
      note,
      quotedPrice: 0,
      billingAddress,
      paymentType: "unknown",
      isPriceAccepted: "pending",
      deliveryStatus: "request",
    };

    const token = getTokenFromLocalStorage();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    const prescription = await axios.post(
      "http://localhost:5000/prescription/upload",
      uploadData,
      config
    );
    setLoading(false);
    notifySuccess("Prescription uploaded successfully.");
    clearForm();
    clearFields();
  };

  return (
    <div className="flex justify-center">
      <ProtectedRoutes />
      <div className="w-[98%] bg-white px-6 py-6 md:w-[600px] rounded-xl  shadow-xl">
        <div className="w-full flex justify-center text-[22px] mb-2">
          <h1 className="font-semibold">Upload Prescription</h1>
        </div>

        {/* bottom container h-[480px]*/}
        <div className=" flex flex-col justify-around">
          {/* prescription div */}
          <div className="h-[250px] flex flex-col justify-around">
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
                    className="h-[150px] border-[1px] border-[#37474F]"
                  />
                </div>
              ) : (
                <div className="h-[150px] w-[150px] bg-[#ffffff] border-[#37474F] border-[1px] flex  flex-col items-center justify-center text-sm rounded-sm">
                  <p>No photo</p>
                  <p>to preview</p>
                </div>
              )}
            </div>

            <div className="">
              <input
                type="file"
                className="w-[100%] outline-none"
                //onChange={(e) => setPicture(e.target.value)}
                onChange={handleFileInputChange}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          </div>

          <div className="my-2">
            <p className="text-[#37474F] font-medium mb-1">Doctor's Name:</p>
            <input
              type="text"
              className="border w-full rounded-md pl-2 outline-none"
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>

          <div className="my-2">
            <p className="text-[#37474F] font-medium mb-1">
              Doctor's NMC Number:
            </p>
            <input
              type="number"
              className="border w-full rounded-md pl-2 outline-none"
              onChange={(e) => setNMC(e.target.value)}
            />
          </div>
          {/* add div when + btn clicked */}
          <div className="">
            <div className="flex w-full justify-between items-center my-2">
              <p className="text-[#37474F] font-medium">Medicines:</p>
              <img
                src={add}
                alt=""
                className="w-[35px]"
                onClick={() => addMedicine()}
              />
            </div>

            {medicine.map((med) => {
              return (
                <Medicine
                  med={med}
                  removeMedicine={removeMedicine}
                  setMedicine={setMedicine}
                  updateName={updateName}
                  key={med.count}
                  updateQty={updateQty}
                />
              );
            })}
          </div>

          {/*bottom section div  */}
          <div className="h-[380px] flex flex-col justify-between mt-4">
            <div>
              <p className="text-[#37474F] font-medium pb-1">Add a Note:</p>
              <textarea
                type="text"
                className="border w-full rounded-md pl-2 outline-none resize-none"
                rows="3"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div>
              <h1 className="font-medium pb-1">Your Billing Address:</h1>
              <div onClick={() => setShowModal(true)}>
                <div className="w-[100%] rounded-sm outline-none pl-2 h-32 border flex justify-center items-center cursor-pointer">
                  {billingAddress ? (
                    <p>{billingAddress}</p>
                  ) : (
                    <img src={addSym} alt="" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-6"
                onClick={() => condition()}
              />
              <p>Above information are correct.</p>
            </div>

            {disabled ? (
              <div className="flex justify-center">
                <button
                  className=" text-white px-3 py-1 rounded-md
                  bg-[#7ba3b7] cursor-not-allowed outline-none xl:my-2"
                  disabled
                >
                  Upload
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <button
                  className=" text-white px-3 py-1 rounded-md
                  bg-[#30789c] outline-none xl:my-2 mr-4"
                  onClick={uploadPrescription}
                >
                  Upload
                </button>
                <ClipLoader
                  color="#E25247"
                  loading={loading}
                  size={25}
                  speedMultiplier={1}
                />
              </div>
            )}
          </div>
          {showModal && <AddressModal setShowModal={setShowModal} />}
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default UploadPrescriptionPage;
