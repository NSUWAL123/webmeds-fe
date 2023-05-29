import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../utils/handleToken";
import axios from "axios";

const AdminChat = () => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);

  const token = getTokenFromLocalStorage();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };
  useEffect(() => {
    (async () => {
      const fetchChat = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/chat/`,
        config
      );
      setChatMessage(fetchChat.data);

      fetchChat.data.map(async (user) => {
        const fetchUsers = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/getUserById/${user.userId}`
        );
        setChatUsers((prev) => [...prev, fetchUsers.data]);
      });
      window.scrollTo(0, 0);
    })();
  }, []);

  const openChat = (user) => {
    navigate(`/admin/chat/${user}`);
  };

  return (
    <div className="h-[80vh] w-[90vw] max-w-[500px] mx-auto rounded-lg bg-gray-100 flex flex-col ">
      <div className="text-2xl px-5 py-3  bg-[#5D94E7] rounded-t-xl text-white font-medium">
        Recent Chats
      </div>

      <div>
        {chatMessage?.map((user) => {
          return (
            <div
              className="flex items-center px-5 gap-3 font-medium text-xl border-b-2 py-2 cursor-pointer justify-between"
              onClick={() => openChat(user?.userId)}
            >
              <div className="flex gap-4">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-3xl">
                    account_circle
                  </span>
                </div>
                <div className="">
                  <div>
                    {chatUsers?.map((cu) => {
                      // user?.userId
                      if (user?.userId === cu._id) {
                        return <p>{cu?.name}</p>;
                      }
                      return null;
                    })}
                  </div>
                  <div className="text-sm font-normal text-gray-500">
                    {user.messages[user.messages.length - 1].substring(2)}
                  </div>
                </div>
              </div>
              <div className="text-sm  text-gray-500">
                {user.date.toLocaleString().split("T")[0]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminChat;
