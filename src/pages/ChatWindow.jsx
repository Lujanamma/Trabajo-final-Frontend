import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import './ChatWindow.css';
import botResponses from '../data/botresponses'; // arriba, junto a los otros imports

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatWindow = () => {
  const { selectedChatId, messages, setMessages } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState('');

  if (!selectedChatId) {
    return (
      <div className="chat-window empty">
        <p>Seleccioná un chat para comenzar</p>
      </div>
    );
  }

  const chatMessages = messages[selectedChatId] || [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
  
    const updated = {
      ...messages,
      [selectedChatId]: [
        ...chatMessages,
        { text: newMessage, from: 'me', timestamp: new Date().toISOString() }
      ]
    };
  
    setMessages(updated);
    setNewMessage('');
  
    // Simular respuesta automática
   // Simular respuesta automática
setTimeout(() => {
  const respuestas = botResponses[selectedChatId] || ['...'];
  const respuestaAleatoria =
    respuestas[Math.floor(Math.random() * respuestas.length)];

  setMessages(prev => ({
    ...prev,
    [selectedChatId]: [
      ...(prev[selectedChatId] || []),
      { text: respuestaAleatoria, from: 'them', timestamp: new Date().toISOString() }
    ]
  }));
}, 1000);

  };
  

  return (
    <div className="chat-window">
     <div className="messages">
  {chatMessages.map((msg, index) => (
    <div
      key={index}
      className={`message ${msg.from === 'me' ? 'sent' : 'received'}`}
    >
      <span>{msg.text}</span>
      <span className="timestamp">{formatTime(msg.timestamp)}</span>
    </div>
        ))}
      </div>

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
