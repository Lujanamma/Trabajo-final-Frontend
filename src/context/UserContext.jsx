import { createContext, useState } from 'react';
import messagesData from '../data/messages';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(1); // ← Chat inicial seleccionado

  // Chats fijos (deben coincidir con los IDs de messagesData)
  const fixedChats = [
    { id: 1, name: 'El Pomberito', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Pomberito' },
    { id: 2, name: 'Locomotora', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Locomotora' },
    { id: 3, name: 'Alejo (Locoarts)', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alejo' },
    { id: 4, name: 'Valentina (Locoarts)', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Valentina' },
    { id: 5, name: 'Doña Lila', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DoñaLila' },
    { id: 6, name: 'Tito Cable', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TitoCable' },
    { id: 7, name: 'Marquitos 5000', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Marquitos5000' },
    { id: 8, name: 'La Bruja Clara', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=BrujaClara' },
    { id: 9, name: 'ÑoñoX', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NonoX' },
    { id: 10, name: 'Bot Marolio', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=MarolioBot' }
  ];

  const [messages, setMessages] = useState(messagesData);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedChatId,
        setSelectedChatId,
        messages,
        setMessages,
        chats: fixedChats // ← Chats siempre disponibles
      }}
    >
      {children}
    </UserContext.Provider>
  );
};