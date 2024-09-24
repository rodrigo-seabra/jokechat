import React, { useState } from 'react';
import { sendMessageToBot } from '../services/api';
import Message from './Message';

import "../styles/Chat.css";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setErrorMessage(''); // Limpa mensagens de erro

        try {
            const botResponse = await sendMessageToBot(input);
            const botMessage = { sender: 'bot', text: botResponse.message };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                setErrorMessage('Limite de requisições excedido. Crie uma conta para continuar.');
            } else {
                setErrorMessage('Erro ao enviar mensagem. Tente novamente.');
            }
        }

        setInput('');
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>

        <div className="chat-container">
            <h2 className="chat-title">Joke Chat</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <Message key={index} sender={msg.sender} text={msg.text} />
                ))}
                {errorMessage && <Message sender="bot" text={errorMessage} />}
            </div>
            <div className="input-box">
                <input 
                    type="text" 
                    value={input} 
                    onChange={handleInputChange} 
                    onKeyPress={handleKeyPress} 
                    placeholder="Digite sua mensagem..." 
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
        </>
    );
}
