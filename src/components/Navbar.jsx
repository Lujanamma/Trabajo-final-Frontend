// src/components/Navbar.jsx
import './Navbar.css';

const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      <span className="logo">Clon WhatsApp</span>
      <div className="user-info">
        <span>{user}</span>
      </div>
    </div>
  );
};

export default Navbar;
