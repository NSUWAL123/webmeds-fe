import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import axios from "axios";
import emailverified from "../pictures/photo/emailverified.svg";

const EmailVerification = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [validUrl, setValidUrl] = useState(true);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/user/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  });

  return (
    <div>
      {validUrl ? (
        <div className="bg-[#E4E4E4] w-screen, h-screen flex justify-center items-center">
          <div className="bg-white w-4/5 h-4/6 rounded-3xl flex flex-col justify-around items-center py-14 max-w-[720px]">
            <img
              src={emailverified}
              alt=""
              srcset=""
              className="w-[120px] ml-6 md:w-[180px]"
            />
            <div className="font-semibold text-[20px] flex flex-col items-center md:text-[25px]">
              <p>Your account has been</p>
              <p>verified successfully!</p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FF3232] text-white rounded-xl px-4 py-2 font-semibold w-28 md:text-[18px]"
            >
              Done!
            </button>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default EmailVerification;
