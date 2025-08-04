import React from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './Chat.css'; // Asegurate que está

const Home = () => {
  return (
    <div className="chat-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="chat-window">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Home;
