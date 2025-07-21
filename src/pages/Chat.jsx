import React, { useContext } from "react";
import Sidebar from "../pages/Sidebar";
import ChatWindow from "../pages/ChatWindow";
import { UserContext } from "../context/UserContext";
import "./Chat.css";

const Chat = () => {
  const { selectedChat } = useContext(UserContext);
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="chat-container">
      {(!isMobile || !selectedChat) && <Sidebar />}
      {(!isMobile || selectedChat) && <ChatWindow />}
    </div>
  );
};

export default Chat;
