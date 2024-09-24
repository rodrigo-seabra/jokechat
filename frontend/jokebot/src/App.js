import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat'; // Importe o componente do chat
import Header from './components/Header'; // Importe o Header
import { AuthProvider } from './context/AuthContext';
import "./App.css"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} /> {/* Rota para o chat */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
