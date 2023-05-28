import React from "react";
import ChatComponent from "../../components/chat/ChatComponent";
import { useParams } from "react-router-dom";

const AdminPrivateChat = () => {
  const params = useParams();
  return (
    <div>
      <ChatComponent id={params.id} />
    </div>
  );
};

export default AdminPrivateChat;
