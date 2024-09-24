// src/components/Home.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Estilos opcionais

const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    setIsAuthenticated(false); // Atualiza o estado de autenticação
  };

  const goToChat = () => {
    navigate('/chat'); // Navega para a rota do chat
  };

  const goToLogin = () => {
    navigate('/login'); // Navega para a rota de login
  };

  const goToRegister = () => {
    navigate('/register'); // Navega para a rota de cadastro
  };

  return (
    <div className="home">
      <h1>Bem-vindo à Página Inicial</h1>
      {isAuthenticated ? (
        <div>
          <p>Você está autenticado!</p>
          <button onClick={handleLogout}>Sair</button>
          <button onClick={goToChat}>Ir para Chat</button>
        </div>
      ) : (
        <div>
          <p>Você não está autenticado. Por favor, faça login.</p>
          <button onClick={goToLogin}>Login</button>
          <button onClick={goToRegister}>Cadastrar</button>
          <button onClick={goToChat}>Ir para Chat</button>
        </div>
      )}
    </div>
  );
};

export default Home;
