import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './Chat.css';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="chat-container">
      {/* Sidebar siempre visible en desktop, o cuando no hay chat seleccionado en móvil */}
      {(!isMobile || !id) && <Sidebar />}
      
      {/* ChatWindow siempre visible en desktop, o cuando hay chat seleccionado en móvil */}
      {(!isMobile || id) && <ChatWindow />}
      
      {/* Botón de volver en móvil cuando hay chat seleccionado */}
      {isMobile && id && (
        <button 
          className="mobile-back-button"
          onClick={() => navigate('/chat')}
        >
          ← Volver a chats
        </button>
      )}
    </div>
  );
};

export default Chat;