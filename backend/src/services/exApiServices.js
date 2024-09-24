const fs = require('fs');
const path = require('path');

let currentJoke = {
    setup: '',
    delivery: '',
    awaitingConfirmation: false
};

const getJokesFromFile = () => {
    const data = fs.readFileSync(path.join(__dirname, '../data/jokes.json'));
    return JSON.parse(data);
};

async function getJoke() {
    const jokes = getJokesFromFile();
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const joke = jokes[randomIndex];

    if (joke.type === 'single') {
        currentJoke.awaitingConfirmation = false;
        return joke.joke;
    } else if (joke.type === 'twopart') {
        currentJoke.setup = joke.setup;
        currentJoke.delivery = joke.delivery;
        currentJoke.awaitingConfirmation = true;
        return currentJoke.setup; // Retorna apenas o setup
    }

    return 'Desculpe, não consegui encontrar uma piada agora.';
}

function waiting() {
    if (currentJoke.awaitingConfirmation) {
        const delivery = currentJoke.delivery;
        currentJoke.awaitingConfirmation = false; // Reseta a confirmação
        return delivery; // Retorna a punchline
    }
    return null;
}

module.exports = { getJoke, waiting };
