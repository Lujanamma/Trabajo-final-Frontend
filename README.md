# 💬 WhatsApp Web Clon – Proyecto Final Frontend

Este es un clon funcional de WhatsApp Web construido con **React**, como proyecto final de frontend. La app simula conversaciones con personajes ficticios, respuestas automáticas, y cuenta con login, modo oscuro, vista responsive y navegación protegida.

## ✨ Características

- Login simulado con persistencia en `localStorage`
- Vista principal con barra lateral y ventana de chat
- Chats con personajes ficticios y avatares personalizados (SVG)
- Envío de mensajes + respuestas automáticas por bot
- Búsqueda de mensajes en el chat
- Timestamps en cada mensaje
- Rutas protegidas con `react-router-dom`
- Soporte para modo oscuro
- Diseño responsive

## 📁 Estructura del proyecto

src/
├── assets/
│ └── avatars/ # Avatares SVG
├── components/
│ ├── Navbar.jsx
│ ├── Sidebar.jsx
│ └── ChatListItem.jsx
├── context/
│ └── UserContext.jsx # Contexto global de usuario y chats
├── data/
│ ├── contacts.js # Lista de chats
│ └── botresponses.js # Respuestas automáticas por bot
├── pages/
│ ├── Login.jsx
│ ├── Chat.jsx
│ └── ChatWindow.jsx
├── App.jsx
├── main.jsx
└── index.css