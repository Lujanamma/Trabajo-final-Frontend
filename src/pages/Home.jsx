import React from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './Chat.css';

const Home = () => {
  return (
    <div className="chat-container">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default Home;