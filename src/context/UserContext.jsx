import { createContext, useState } from 'react';
import messagesData from '../data/messages';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const [selectedChatId, setSelectedChatId] = useState(null);

  const [messages, setMessages] = useState(messagesData); // 👈 usamos los mensajes

  return (
    <UserContext.Provider
      value={{ user, setUser, selectedChatId, setSelectedChatId, messages, setMessages }}
    >
      {children}
    </UserContext.Provider>
  );
};
