import React, { useEffect, useState } from "react";
import AddressModal from "../components/AddressModal";
import addsym from "../pictures/icons/add-symbol.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import axios from "axios";
import { populateUser } from "../redux/userSlice";

const ProfilePage = () => {
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  console.log(userData);
  const [showDeleteModal, setShowModal] = useState(false);

  // const token = ;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      const user = await axios.get(
        "http://localhost:5000/user/getUser/",
        config
      );
      dispatch(populateUser(user.data));

      // console.log(user.data)
    })();
  }, []);

  return (
    <div className="flex justify-center lg:h-[585px] items-center">
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
                  value={userData.name}
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
                  value={userData.mobile}
                />
              </div>
              <div>
                <p className="mb-1">Date of Birth:</p>
                <input
                  type="text"
                  className="w-[100%] rounded-sm outline-none pl-2 h-8 border"
                  value={userData.dob}
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
                <img src={addsym} alt=""/>
              </div>
            </div>

            
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <button className="bg-[#37474F] text-white px-3 py-1 py rounded-2xl">
            Save Details
          </button>
        </div>
      </div>

      <div className={showDeleteModal ? "block" : "hidden"}>
        <AddressModal setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default ProfilePage;
