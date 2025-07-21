import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, selectedChatId, setSelectedChatId, messages } = useContext(UserContext);
  const [search, setSearch] = useState('');

  const chats = [
    {
      id: 1,
      name: 'El Pomberito',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Pomberito',
    },
    {
      id: 2,
      name: 'Locomotora',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Locomotora',
    },
    {
      id: 3,
      name: 'Alejo (Locoarts)',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alejo',
    },
    {
      id: 4,
      name: 'Valentina (Locoarts)',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Valentina',
    },
    {
      id: 5,
      name: 'Doña Lila',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DoñaLila',
    },
    {
      id: 6,
      name: 'Tito Cable',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TitoCable',
    },
    {
      id: 7,
      name: 'Marquitos 5000',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Marquitos5000',
    },
    {
      id: 8,
      name: 'La Bruja Clara',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=BrujaClara',
    },
    {
      id: 9,
      name: 'ÑoñoX',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NonoX',
    },
    {
      id: 10,
      name: 'Bot Marolio',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=MarolioBot',
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return isNaN(date) ? '' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="sidebar">
      <h2>Hola, {user?.name || 'Usuario'}</h2>
      <input
        type="text"
        placeholder="Buscar chat..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="chat-list">
        {filteredChats.map(chat => {
          const lastMsg = messages[chat.id]?.slice(-1)[0];
          return (
            <li
              key={chat.id}
              className={`chat-item ${selectedChatId === chat.id ? 'selected' : ''}`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <span>{chat.name}</span>
                <div className="last-message">
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lastMsg?.text || 'Sin mensajes'}
                  </span>
                  <small style={{ fontSize: '0.75rem', color: '#888', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                    {formatTime(lastMsg?.timestamp)}
                  </small>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
