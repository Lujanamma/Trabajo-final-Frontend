import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Search, MoreVertical, Menu, ArrowLeft } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isMobile, onClose }) => {
  const { user, chats, messages } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para resaltar coincidencias
  const highlightMatch = (text) => {
    if (!searchTerm || !text) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <strong key={i}>{part}</strong> 
        : part
    );
  };

  const filteredChats = chats.filter(chat => {
    const chatMatches = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const messageMatches = messages[chat.id]?.some(msg => 
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return chatMatches || messageMatches;
  });

  const getLastMessage = (chatId) => {
    const chatMessages = messages[chatId];
    return chatMessages?.[chatMessages.length - 1]?.text || "Nuevo chat";
  };

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
    setSearchTerm('');
    if (isMobileView && onClose) {
      onClose(); // Cierra el sidebar en móvil al seleccionar chat
    }
  };

  return (
    <div className={`sidebar-container ${isMobile ? 'mobile-sidebar' : ''}`}>
      {/* Header del sidebar */}
      <div className="sidebar-header">
        <div className="header-left">
          {isMobileView && (
            <button 
              className="mobile-back-button"
              onClick={onClose}
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h2>Bienvenido, {user?.name || 'Usuario'}</h2>
        </div>
        <div className="header-icons">
          <Search 
            className="icon" 
            onClick={() => document.querySelector('.search-input input')?.focus()} 
          />
          <MoreVertical className="icon" />
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <div className="search-input">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar o empezar nuevo chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setSearchTerm('')}
          />
        </div>
      </div>

      {/* Lista de chats */}
      <div className="chat-list">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${searchTerm ? 'highlight' : ''}`}
            onClick={() => handleChatClick(chat.id)}
          >
            <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
            <div className="chat-info">
              <div className="chat-name-row">
                <span className="chat-name">{highlightMatch(chat.name)}</span>
                <span className="chat-time">
                  {new Date(messages[chat.id]?.[0]?.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="last-message">
                {highlightMatch(getLastMessage(chat.id))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;