import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/handleToken";
import { clearForm } from "../../utils/clearForm";

const ChatComponent = (props) => {
  const id = props.id;

  const [messagesArr, setMessagesArr] = useState([]);
  const [user, setUser] = useState("");

  const token = getTokenFromLocalStorage();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  const fetchMessages = async () => {
    try {
      if (typeof id === "undefined") {
        const fetchMessage = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/chat/id/`,
          config
        );
        setMessagesArr(fetchMessage?.data[0].messages);
      } else {
        const fetchMessage = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/chat/id/${id}`,
          config
        );
        setMessagesArr(fetchMessage?.data[0].messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [id, config]);

  useEffect(() => {
    if (typeof id !== "undefined") {
      (async () => {
        const fetchUsers = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/getUserById/${id}`
        );
        setUser(fetchUsers.data.name);
      })();
    }
    fetchMessages();
  }, []);

  const [inputMsg, setInputMsg] = useState("");
  const divRef = useRef(null);

  const sendHandler = async () => {
    if (inputMsg !== "") {
      if (typeof id === "undefined") {
        let prefixedMsg = `U-${inputMsg}`;
        const fetchMessage = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/chat/id/`,
          { message: prefixedMsg },
          config
        );
        fetchMessages();
        setInputMsg("");
        clearForm();
      } else {
        let prefixedMsg = `P-${inputMsg}`;
        const fetchMessage = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/chat/id/${id}`,
          { message: prefixedMsg },
          config
        );
        fetchMessages();
        setInputMsg("");
        clearForm();
      }
    }
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messagesArr]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kathmandu", // Set to Nepal (Asia/Kathmandu) Time
  };
  return (
    <div className="h-[79vh] w-[90vw] max-w-[500px] mx-auto rounded-lg shadow-xl">
      {/* top */}
      <div className="flex items-center  pl-5 gap-3 bg-[#ffffff] border-b-2 h-[10%] rounded-t-lg">
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
        <h2 className="text-xl font-medium">{user ? user : "Pharmacist"}</h2>
      </div>
      {/* middle */}
      <div
        className="h-[80%] bg-white px-3 overflow-y-scroll scrollbar-thin
                  scrollbar-thumb-rounded-full scrollbar-track-rounded-full
                  scrollbar-thumb-[#e8e8e8] scrollbar-track-white"
        ref={divRef}
      >
        {messagesArr?.map((msg, i) => {
          const prefix = msg?.substring(0, 2);
          const message = msg?.substring(2);
          if (
            (prefix === "P-" && typeof id === "undefined") ||
            (prefix === "U-" && typeof id !== "undefined")
          ) {
            return (
              <div
                className="bg-[#e8e8e8] my-2 left-0 w-fit px-2 py-1 max-w-[270px] h-fit break-words rounded-xl"
                key={i}
              >
                {message}
              </div>
            );
          } else {
            return (
              <div className="w-full flex justify-end">
                <div
                  className="bg-blue-500 text-white my-2 right-0 w-fit px-2 py-1 max-w-[270px] h-fit break-words rounded-xl"
                  key={i}
                >
                  {message}
                </div>
              </div>
            );
          }
        })}
        {messagesArr.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-xl ">
              No Messsages To Display
            </div>
          </div>
        )}
      </div>
      {/* bottom */}
      <div className="flex items-center h-[10%] pl-5 gap-3 bg-[#ffffff] border-t-2 rounded-b-lg">
        <input
          type="text"
          placeholder="Write something ..."
          className="w-full bg-gray-100 rounded-lg outline-none px-2 py-1 text-lg"
          onChange={(e) => setInputMsg(`${e.target.value}`)}
          onKeyDown={(e) => e.key === "Enter" && sendHandler()}
          value={inputMsg}
        />
        <span
          className="material-symbols-outlined text-[#5D94E7] text-3xl pr-3 cursor-pointer"
          onClick={sendHandler}
        >
          send
        </span>
      </div>
    </div>
  );
};

export default ChatComponent;
