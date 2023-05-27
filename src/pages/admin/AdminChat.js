import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminChat = () => {
  const navigate = useNavigate();
  // const [currUser, setCurrUser] = useState('');

  const users = [
    "Ram",
    "Nishit",
    "Hari",
    "Paastha",
    "Baklool",
    "Nishchal",
    "Tenzing",
  ];

  const openChat = (user) => {
    navigate(`/admin/chat/${user}`);
  };
  return (
    <div className="h-[80vh] w-[90vw] max-w-[500px] mx-auto rounded-lg bg-gray-100 flex flex-col ">
      <div className="text-2xl px-5 py-3  bg-[#5D94E7] rounded-t-xl text-white font-medium">
        Recent Chats
      </div>

      <div>
        {users.map((user) => {
          return (
            <div
              className="flex items-center px-5 gap-3 font-medium text-xl border-b-2 py-2 cursor-pointer"
              onClick={() => openChat(user)}
            >
              <div className="flex items-center">
                <span class="material-symbols-outlined text-3xl">
                  account_circle
                </span>
              </div>
              <div className="">
                <p>{user}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminChat;
