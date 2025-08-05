import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Check, Send, Search, Phone, Video, MoreVertical, ArrowLeft, X } from 'lucide-react';
import './ChatWindow.css';

const BOT_RESPONSES = {
  'El Pomberito': ['¡Soy el Pomberito!', '¿Necesitas ayuda?', 'Cuéntame qué necesitas'],
  'Locomotora': ['¡Chucu chucu!', '¡Todo a bordo!', 'Próxima estación...'],
  'Alejo (Locoarts)': ['Hola, ¿qué tal?', '¿En qué puedo ayudarte?'],
  'Valentina (Locoarts)': ['¡Hola! Soy Valentina', '¿Cómo estás?'],
  'Doña Lila': ['Pasá por casa cuando quieras', 'Tengo algo rico para vos'],
  'Tito Cable': ['f', 'Conectado', 'En línea'],
  'Marquitos 5000': ['¡Hola! Soy Marquitos', '5000 veces mejor']
};

const ChatWindow = ({ onBack, className = '' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chats, messages, setMessages } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const messagesEndRef = useRef(null);

  const currentChat = chats.find(chat => chat.id === Number(id));

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, id]);

  const getBotResponse = (botName) => {
    const responses = BOT_RESPONSES[botName] || ['Hola, ¿en qué puedo ayudarte?'];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      text: newMessage,
      from: 'me',
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), newMsg]
    }));

    setNewMessage('');

    if (id >= 1 && id <= 7) {
      setTimeout(() => {
        const botResponse = {
          text: getBotResponse(currentChat.name),
          from: 'them',
          timestamp: new Date().toISOString()
        };

        setMessages(prev => ({
          ...prev,
          [id]: [...(prev[id] || []), botResponse]
        }));
      }, 1000 + Math.random() * 1000);
    }
  };

  const filteredMessages = (messages[id] || []).filter(msg => 
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text) => {
    if (!searchTerm || !text) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <strong key={i}>{part}</strong> 
        : part
    );
  };

  return (
<div className={`chat-window ${className}`}>
      {/* Header para móvil */}
      {isMobile && (
        <div className="mobile-chat-header">
    <button 
      onClick={onBack} 
      className="mobile-back-button"
    >
      <ArrowLeft size={24} />
    </button>
    <div className="mobile-contact-info">
      <img src={currentChat?.avatar} className="mobile-avatar" />
      <div>
        <div className="mobile-contact-name">{currentChat?.name}</div>
      </div>
    </div>
  </div>
)}

      {/* Header normal (desktop) */}
      {!isMobile && (
        <div className="standard-header">
          <img src={currentChat?.avatar} alt={currentChat?.name} className="chat-avatar" />
          <div className="chat-info">
            <div className="chat-name">{currentChat?.name}</div>
            <div className="chat-status">{currentChat?.isBot ? 'En línea' : 'Últ. conexión hoy a las 12:45'}</div>
          </div>
          <div className="chat-actions">
            {isSearching ? (
              <X className="icon" onClick={() => setIsSearching(false)} />
            ) : (
              <Search className="icon" onClick={() => setIsSearching(true)} />
            )}
            <Phone className="icon" />
            <Video className="icon" />
            <MoreVertical className="icon" />
          </div>
        </div>
      )}

      {/* Barra de búsqueda */}
      {isSearching && (
        <div className="search-container">
          <div className="search-input">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar en este chat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <X className="clear-icon" onClick={() => setSearchTerm('')} />
            )}
          </div>
        </div>
      )}

      {/* Área de mensajes */}
      <div className="messages-container">
        {(searchTerm ? filteredMessages : messages[id] || []).map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'me' ? 'me' : 'them'}`}>
            <div className="message-bubble">
              {highlightText(msg.text)}
              <div className="message-meta">
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.from === 'me' && (
                  <span className="message-status">
                    <Check size={12} color={msg.status === 'read' ? "#53bdeb" : "#8696a0"} />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <div className="message-input-container">
        <textarea
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Escribe un mensaje..."
          rows="1"
        />
        <button 
          className="send-button" 
          onClick={handleSendMessage} 
          disabled={!newMessage.trim()}
        >
          <Send size={20} color={newMessage.trim() ? "#008069" : "#8696a0"} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;