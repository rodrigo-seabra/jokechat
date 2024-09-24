import React, { useState } from 'react';
import { registerUser } from '../services/api';
import '../styles/Register.css';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState(''); // Novo estado
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      await registerUser(name, email, password, phone, confirmpassword);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      alert('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className='div'>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Cadastrar</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

    </div>

  );
};

export default Register;
