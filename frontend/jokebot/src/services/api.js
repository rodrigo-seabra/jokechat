export const sendMessageToBot = async (message) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    console.log(data);
    return data;  
  } catch (error) {
    console.log("Erro ao enviar mensagem para o bot:", error);
    return { reply: 'Desculpe, houve um erro. Tente novamente mais tarde.' };
  }
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!data.token) {
    throw new Error('Login falhou');
  }

  return data.token; 
};

export const registerUser = async (name, email, password, phone, confirmpassword) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, phone, confirmpassword }),
  });

  const data = await response.json();
  if (!data.token) {
    throw new Error('Erro ao registrar');
  }
};
