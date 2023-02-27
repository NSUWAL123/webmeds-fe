import React, { useEffect, useState } from "react";
import AddressModal from "../components/modals/AddressModal";
import addsym from "../pictures/icons/add-symbol.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import axios from "axios";
import { populateUser } from "../redux/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../utils/Toast";
import { updateUser } from "../redux/userSlice";
import ProtectedRoutes from "../routes/ProtectedRoutes";

const ProfilePage = () => {
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  console.log(userData);
  const [showDeleteModal, setShowModal] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  useEffect(() => {
    (async () => {
      const user = await axios.get(
        "http://localhost:5000/user/getUser/",
        config
      );
      dispatch(populateUser(user.data));
      setName(user.data.name);
      setMobile(user.data.mobile);
      setDob(user.data.dob.split("T")[0])
      window.scrollTo(0, 0);
    })();
  }, []);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  console.log(dob)

  const updateUserDetails = async () => {
    if (!name | !mobile) {
      notifyError("Empty Fields!");
      return;
    }

    const user = await axios.post(
      "http://localhost:5000/user/update/",
      {
        name: name,
        mobile: mobile,
        billingAddress: userData.billingAddress,
      },
      config
    );

    dispatch(updateUser({ name, mobile }));
    notifySuccess("Successfully updated your profile information.");
  };

  return (
    <div className="flex justify-center lg:h-[585px] items-center">
      <ProtectedRoutes/>
      <div className="bg-white w-[90%] rounded-lg lg:h-[420px] shadow-xl">
        <div className="lg:flex">
          {/* profile container */}
          <div className="flex flex-col items-center py-5 lg:w-1/2">
            <h1 className="font-semibold text-[18px] lg:text-[22px]">
              Profile Information
            </h1>

            <div className="w-[90%] h-[295px] flex flex-col justify-around">
              <div>
                <p className="mb-1">Full Name:</p>
                <input
                  type="text"
                  className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1">Email:</p>
                <input
                  type="text"
                  className="w-[100%] rounded-sm outline-none pl-2 h-8 border "
                  value={userData.email}
                  disabled
                />
              </div>
              <div>
                <p className="mb-1">Mobile:</p>
                <input
                  type="text"
                  className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1">Date of Birth:</p>
                <input
                  type="text"
                  className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                  value={dob}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="w-[90%] h-[1px] bg-black"></div>
            <div className="w-[1px] h-[90%] bg-black"></div>
          </div>

          {/* billing container */}
          <div className="flex flex-col items-center py-5 lg:w-1/2">
            <h1 className="font-semibold text-[18px] lg:text-[22px]">
              Billing Address
            </h1>

            <div className="w-[90%]">
              <p className="mb-1">Address:</p>
              <div
                className="w-[100%] rounded-sm outline-none pl-2 h-32 border flex justify-center items-center cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                {userData.billingAddress === "" ? (
                  <img src={addsym} alt="" />
                ) : (
                  <p>{userData.billingAddress}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <button
            className="bg-[#37474F] text-white px-3 py-1 py rounded-2xl"
            onClick={() => {
              updateUserDetails();
            }}
          >
            Save Details
          </button>
        </div>
      </div>

      <div className={showDeleteModal ? "block" : "hidden"}>
        <AddressModal setShowModal={setShowModal} />
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default ProfilePage;
