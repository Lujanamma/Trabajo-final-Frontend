import { createContext, useState, useEffect } from 'react';
import messagesData from '../data/messages';
import chatData from '../data/contacts.js'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState(messagesData);

  const [chats, setChats] = useState(() => {
    return JSON.parse(localStorage.getItem('chats')) || [];
  });


  useEffect(() => {
    const stored = localStorage.getItem('chats');
    if (!stored) {
      setChats(chatData);
      localStorage.setItem('chats', JSON.stringify(chatData));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedChatId,
        setSelectedChatId,
        messages,
        setMessages,
        chats,
        setChats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
