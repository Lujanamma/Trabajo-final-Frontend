import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './Chat.css';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true); // en desktop, siempre visible
      } else {
        setShowSidebar(!id); // en mobile, mostrar sidebar si no hay chat seleccionado
      }
    };

    handleResize(); // al cargar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  const handleChatSelect = (chatId) => {
    navigate(`/chat/${chatId}`);
    if (isMobile) setShowSidebar(false); // ocultar lista en mobile
  };

  const handleBack = () => {
    navigate('/chat'); // volver a lista
    if (isMobile) setShowSidebar(true);
  };

  return (
    <div className="chat-container">
      {/* Sidebar (si corresponde mostrarla) */}
      {(!isMobile || showSidebar) && (
        <Sidebar
          onChatSelect={handleChatSelect}
          isMobile={isMobile}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* ChatWindow (solo si hay un ID y no estamos mostrando la sidebar en mobile) */}
      {id && (!isMobile || !showSidebar) && (
        <ChatWindow onBack={handleBack} />
      )}
    </div>
  );
};

export default Chat;
