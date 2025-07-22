import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import './ChatWindow.css';
import botResponses from '../data/botresponses';
import { Search, Phone, Video, MoreVertical } from 'lucide-react';


const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


const getHighlightedText = (text, searchTerm) => {
  if (!searchTerm.trim()) return text;
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
};

const ChatWindow = () => {
  const { selectedChatId, messages, setMessages, chats } = useContext(UserContext);
  if (!chats || !Array.isArray(chats)) {
    return <div className="chat-window empty">Cargando chats...</div>;
  }
  
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  if (!selectedChatId) {
    
    return <div className="chat-window empty">Seleccioná un chat para comenzar</div>;
  }

  const chat = chats.find(c => String(c.id) === String(selectedChatId));
  if (!chat) {
    return <div className="chat-window empty">No se encontró el chat seleccionado.</div>;
  }
  

  const chatMessages = messages[selectedChatId] || [];

  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newEntry = {
      text: newMessage,
      from: 'me',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newEntry]
    }));

    setNewMessage('');

    setTimeout(() => {
      const respuestas = botResponses[selectedChatId] || ['...'];
      const random = respuestas[Math.floor(Math.random() * respuestas.length)];

      setMessages(prev => ({
        ...prev,
        [selectedChatId]: [
          ...(prev[selectedChatId] || []),
          {
            text: random,
            from: 'them',
            timestamp: new Date().toISOString()
          }
        ]
      }));
    }, 1000);
  };

  return (
    <div className="chat-window">
      {}
      <div className="chat-header">
        <div className="chat-info">
          <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
          <div>
            <div className="chat-name">{chat.name}</div>
            <div className="chat-status">En línea</div>
          </div>
        </div>
        <div className="chat-actions">
          <Search className="icon" />
          <Phone className="icon" />
          <Video className="icon" />
          <MoreVertical className="icon" />
        </div>
      </div>

      {}
      <div className="search-messages">
        <input
          type="text"
          placeholder="Buscar en el chat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {}
      <div className="messages">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.from === 'me' ? 'sent' : 'received'}`}
          >
            <span>{getHighlightedText(msg.text, searchTerm)}</span>
            <span className="timestamp">{formatTime(msg.timestamp)}</span>
          </div>
        ))}
      </div>

      {}
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Escribí un mensaje..."
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatWindow;
