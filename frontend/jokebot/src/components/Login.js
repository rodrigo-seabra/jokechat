// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext'; // Importe o contexto

const Login = () => {
  const { setIsAuthenticated } = useAuth(); // Use o contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      localStorage.setItem('token', token);
      console.log(token);
      setIsAuthenticated(true); // Atualiza o estado de autenticação
      navigate('/');
    } catch (error) {
      alert('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className='div'>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
