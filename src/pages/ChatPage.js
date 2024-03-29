import React from "react";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import ChatComponent from "../components/chat/ChatComponent";

const ChatPage = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <ChatComponent />
    </div>
  );
};

export default ChatPage;

// <div className="flex flex-col gap-10 items-center md:mt-32 lg:flex-row lg:justify-center lg:gap-x-16">
//   <ProtectedRoutes />
//   <div>
//     <img
//       src="https://res.cloudinary.com/droaizhlu/image/upload/v1681532868/banners/construction_ur7hku.svg"
//       alt=""
//       className="w-60"
//     />
//   </div>
//   <h1 className="font-semibold text-2xl text-[#37474F] lg:text-4xl">
//     Page Under Construction
//   </h1>
// </div>
