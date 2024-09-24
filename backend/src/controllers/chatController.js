const Conversation = require('../models/conversationModel');
const { processInput } = require('../services/nlpService');
const { getJoke, waiting } = require('../services/exApiServices');


// let awaitingIntentConfirmation = {};
module.exports = class chatController{
    static async  chat(req, res) {
        const userMessage = req.body.message;
        const user = req.body.user || 'Anônimo';
    
    
        // if (awaitingIntentConfirmation[user]) {
        //     console.log("Processando confirmação de intenção...");
    
        //     const originalMessage = awaitingIntentConfirmation[user].message; 
        //     const userIntent = userMessage;  // A intenção que o usuário acabou de fornecer
    
        //     const botRes = await learnNewIntent(originalMessage, userIntent, user); // Aprendendo nova intenção
    
        //     delete awaitingIntentConfirmation[user]; // Removendo da lista de confirmações pendentes
    
        //     return res.json({
        //         message: botRes
        //     });
        // }
    
        // // Processar o input do usuário com NLP
        const nlpResponse = await processInput(userMessage);
    
        let botResponse = nlpResponse.answer;
    
    
        // Se o bot não reconheceu a intenção
        // if (nlpResponse.intent === 'None') {
        //     const botRes = await unknownIntent(userMessage, user);
    
        //     // Agora armazenamos a mensagem original para a próxima interação
        //     awaitingIntentConfirmation[user] = {
        //         message: userMessage,  // Salvando a mensagem original corretamente
        //         timestamp: new Date()  // Mantendo o registro da hora
        //     };
    
    
        //     return res.json({
        //         message: botRes
        //     });
        // } else {
    
        if (nlpResponse.intent === 'jokes.tell' || nlpResponse.intent === 'jokes.tell.another') {
            const joke = await getJoke();
            const res = nlpResponse.answer + `${joke}`
            botResponse = res;
        }
    
        // Se o bot reconheceu a intenção 'jokes.confirmation'
        if (nlpResponse.intent === 'jokes.confirmation') {
            const punchline = waiting();
            if (punchline) {
                botResponse = punchline;
            } else {
                botResponse = 'Não entendi, você quer ouvir a segunda parte da piada?';
            }
        }
    
        // Salvando a conversa no banco de dados
        const conversation = new Conversation({ user, message: userMessage, response: botResponse, intent: nlpResponse.intent });
        await conversation.save();
    
        return res.json({ message: botResponse });
    }
}

