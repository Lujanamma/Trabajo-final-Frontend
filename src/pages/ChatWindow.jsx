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

const ChatWindow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chats, messages, setMessages } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const messagesEndRef = useRef(null);

  const currentChat = chats.find(chat => chat.id === Number(id));

  // Scroll al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages, id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

    // Todos los chats del 1 al 7 son bots
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

        // Marcar mensajes como leídos
        setMessages(prev => {
          const updatedMessages = {...prev};
          if (updatedMessages[id]) {
            updatedMessages[id] = updatedMessages[id].map(msg => {
              if (msg.from === 'me' && msg.status !== 'read') {
                return {...msg, status: 'read'};
              }
              return msg;
            });
          }
          return updatedMessages;
        });
      }, 1000 + Math.random() * 1000);
    }
  };

  // Filtrar y resaltar mensajes
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
    <div className="chat-window">
      {/* Cabecera */}
      <div className="chat-header">
        {isMobile && (
          <button onClick={() => navigate('/chat')} className="back-button">
            <ArrowLeft size={20} />
          </button>
        )}
        
        <img src={currentChat?.avatar} alt={currentChat?.name} className="chat-avatar" />
        
        <div className="chat-info">
          <div className="chat-name">{currentChat?.name}</div>
          <div className="chat-status">{currentChat?.isBot ? 'En línea' : 'Última conexión hoy a las 12:45'}</div>
        </div>
        
        <div className="chat-actions">
          {isSearching ? (
            <X className="icon" size={20} onClick={() => {
              setIsSearching(false);
              setSearchTerm('');
            }} />
          ) : (
            <Search className="icon" size={20} onClick={() => setIsSearching(true)} />
          )}
          <Phone className="icon" size={20} />
          <Video className="icon" size={20} />
          <MoreVertical className="icon" size={20} />
        </div>
      </div>

      {/* Barra de búsqueda */}
      {isSearching && (
        <div className="search-container">
          <div className="search-input">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar en este chat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <X size={18} className="clear-icon" onClick={() => setSearchTerm('')} />
            )}
          </div>
        </div>
      )}

      {/* Área de mensajes */}
      <div className="messages-container">
        {(searchTerm ? filteredMessages : messages[id] || []).map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'me' ? 'me' : 'them'}`}>
            <div className="message-bubble">
              <p>{highlightText(msg.text)}</p>
              <div className="message-meta">
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.from === 'me' && (
                  <span className="message-status">
                    {msg.status === 'read' ? (
                      <>
                        <Check size={12} color="#53bdeb" />
                        <Check size={12} color="#53bdeb" style={{ marginLeft: -4 }} />
                      </>
                    ) : (
                      <Check size={12} color="#8696a0" />
                    )}
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
        <input
          type="text"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Escribe un mensaje..."
        />
        <button className="send-button" onClick={handleSendMessage}>
          <Send size={20} color={newMessage.trim() ? "#008069" : "#8696a0"} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;