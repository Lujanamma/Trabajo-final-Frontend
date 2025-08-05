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

  // Detectar si es mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true); // En desktop siempre mostramos ambos
      } else {
        setShowSidebar(!id); // En mobile: mostramos sidebar solo si no hay chat seleccionado
      }
    };

    handleResize(); // Corre al inicio
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  // Cuando seleccionás un chat desde la lista
  const handleChatSelect = (chatId) => {
    navigate(`/chat/${chatId}`);
    if (isMobile) {
      setShowSidebar(false); // Oculta lista
    }
  };

  // Cuando volvés desde un chat
  const handleBack = () => {
    navigate('/chat');
    if (isMobile) {
      setShowSidebar(true); // Muestra lista
    }
  };

  return (
    <div className="chat-container">
      {/* Mostrar sidebar solo si corresponde */}
      {(showSidebar || !isMobile) && (
        <Sidebar
          onChatSelect={handleChatSelect}
          isMobile={isMobile}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* Mostrar ventana de chat solo si hay id y no se muestra sidebar en mobile */}
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
