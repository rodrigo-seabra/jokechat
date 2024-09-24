import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; 
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Use o contexto
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogoClick = () => {
    navigate('/'); // Redireciona para a home
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout
    navigate('/'); // Redireciona para a home após logout
  };

  return (
    <header className="header">
      <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>Jokes Bot</h1>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </header>
  );
};

export default Header;
