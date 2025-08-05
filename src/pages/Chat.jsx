import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './Chat.css';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(!id);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      } else {
        setShowSidebar(!id);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  const handleChatSelect = (chatId) => {
    navigate(`/chat/${chatId}`);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBack = () => {
    navigate('/chat');
    if (isMobile) {
      setShowSidebar(true);
    }
  };

  return (
    <div className="chat-container">
      {(showSidebar || !isMobile) && (
        <Sidebar
          onChatSelect={handleChatSelect}
          isMobile={isMobile}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {id && (!isMobile || !showSidebar) && (
        <ChatWindow 
          onBack={handleBack} 
          className={isMobile ? 'active' : ''} 
        />
      )}
    </div>
  );
};

export default Chat;