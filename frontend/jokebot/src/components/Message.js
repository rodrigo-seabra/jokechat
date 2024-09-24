import React from 'react'
import '../styles/Message.css';

export default function Message({sender, text}) {
    return (
        <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
          <p>{text}</p>
        </div>
      );
}
