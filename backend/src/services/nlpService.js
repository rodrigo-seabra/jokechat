const { NlpManager } = require('node-nlp');
const Conversation = require('../models/conversationModel');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });

// Treinando intenções relacionadas a piadas
manager.addDocument('pt', 'me conta uma piada', 'jokes.tell');
manager.addDocument('pt', 'quero uma piada', 'jokes.tell');
manager.addDocument('pt', 'pode contar uma piada?', 'jokes.tell');
manager.addDocument('pt', 'conta uma piada', 'jokes.tell');
manager.addDocument('pt', 'me fala outra piada', 'jokes.tell');
manager.addDocument('pt', 'mais uma piada', 'jokes.tell');
manager.addDocument('pt', 'me conte mais uma', 'jokes.tell');
manager.addDocument('pt', 'qual a sua piada', 'jokes.tell');
manager.addDocument('pt', 'qual é a sua piada', 'jokes.tell');

// Avaliação da piada
manager.addDocument('pt', 'essa piada foi boa', 'jokes.evaluate.good');
manager.addDocument('pt', 'gostei da piada', 'jokes.evaluate.good');
manager.addDocument('pt', 'ri muito dessa piada', 'jokes.evaluate.good');
manager.addDocument('pt', 'essa piada foi ruim', 'jokes.evaluate.bad');
manager.addDocument('pt', 'não gostei da piada', 'jokes.evaluate.bad');
manager.addDocument('pt', 'piada sem graça', 'jokes.evaluate.bad');

// Confirmação para segunda parte da piada
manager.addDocument('pt', 'O que?', 'jokes.confirmation');
manager.addDocument('pt', 'Não sei', 'jokes.confirmation');
manager.addDocument('pt', 'como assim?', 'jokes.confirmation');
manager.addDocument('pt', 'fala logo', 'jokes.confirmation');
manager.addDocument('pt', 'continua', 'jokes.confirmation');
manager.addDocument('pt', 'qual é a resposta?', 'jokes.confirmation');
manager.addDocument('pt', 'me diz o final', 'jokes.confirmation');
manager.addDocument('pt', 'hmm', 'jokes.confirmation');
manager.addDocument('pt', 'an', 'jokes.confirmation');

// Explicação da piada
manager.addDocument('pt', 'pode explicar essa piada?', 'jokes.explain');
manager.addDocument('pt', 'o que significa essa piada?', 'jokes.explain');
manager.addDocument('pt', 'me conta o significado', 'jokes.explain');
manager.addDocument('pt', 'por que essa piada é engraçada?', 'jokes.explain');
manager.addDocument('pt', 'me explica a piada', 'jokes.explain');
manager.addDocument('pt', 'não entendi a piada', 'jokes.explain');

// Contar piada para avaliar
manager.addDocument('pt', 'deixa eu te contar uma piada', 'jokes.tellUser');
manager.addDocument('pt', 'posso te contar uma piada?', 'jokes.tellUser');
manager.addDocument('pt', 'vou te contar uma piada', 'jokes.tellUser');
manager.addDocument('pt', 'escuta essa piada', 'jokes.tellUser');
manager.addDocument('pt', 'a piada é essa', 'jokes.tellUser');

// Pedir outra piada
manager.addDocument('pt', 'me conta outra', 'jokes.tell.another');
manager.addDocument('pt', 'quero outra piada', 'jokes.tell.another');
manager.addDocument('pt', 'mais uma piada', 'jokes.tell.another');

// Novas intenções não relacionadas a piadas
manager.addDocument('pt', 'olá', 'greetings.hello');
manager.addDocument('pt', 'oi', 'greetings.hello');
manager.addDocument('pt', 'bom dia', 'greetings.greeting');
manager.addDocument('pt', 'boa noite', 'greetings.greeting');
manager.addDocument('pt', 'fala', 'greetings.hello');

manager.addDocument('pt', 'como você está?', 'greetings.how_are_you');
manager.addDocument('pt', 'tudo bem?', 'greetings.how_are_you');
manager.addDocument('pt', 'vou bem', 'greetings.how_user_are');
manager.addDocument('pt', 'firme', 'greetings.how_user_are');
manager.addDocument('pt', 'tudo em ordem', 'greetings.how_user_are');
manager.addDocument('pt', 'tudo ótimo', 'greetings.how_user_are');
manager.addDocument('pt', 'tudo bem', 'greetings.how_user_are');
manager.addDocument('pt', 'bem', 'greetings.how_user_are');

manager.addDocument('pt', 'quero saber como fazer uma boa piada', 'jokes.tips');
manager.addDocument('pt', 'dicas para contar piadas', 'jokes.tips');
manager.addDocument('pt', 'como ser engraçado?', 'jokes.tips');
manager.addDocument('pt', 'me ajude a praticar', 'jokes.practice');
manager.addDocument('pt', 'quero praticar contar piadas', 'jokes.practice');
manager.addDocument('pt', 'me ajude com piadas', 'jokes.practice');
manager.addDocument('pt', 'como contar uma piada', 'jokes.how_to_tell');
manager.addDocument('pt', 'como eu conto uma piada?', 'jokes.how_to_tell');
manager.addDocument('pt', 'quais são os passos para contar uma piada?', 'jokes.how_to_tell');
manager.addDocument('pt', 'o que fazer para contar uma piada?', 'jokes.how_to_tell');

manager.addDocument('pt', 'sim', 'jokes.practice.confirm');
manager.addDocument('pt', 'claro', 'jokes.practice.confirm');
manager.addDocument('pt', 'com certeza', 'jokes.practice.confirm');
manager.addDocument('pt', 'vamos praticar', 'jokes.practice.confirm');

// Adicionando exemplos de piadas que os usuários podem contar
manager.addDocument('pt', 'Por que a galinha atravessou a rua? Para chegar do outro lado!', 'jokes.userJoke');
manager.addDocument('pt', 'Qual é o animal que anda com uma perna só? O pato!', 'jokes.userJoke');
manager.addDocument('pt', 'minha piada é essa: por que o céu é azul?', 'jokes.userJoke');
manager.addDocument('pt', 'minha piada é essa', 'jokes.userJoke');
manager.addDocument('pt', 'escuta essa', 'jokes.userJoke');
manager.addDocument('pt', 'porque', 'jokes.userJoke');
manager.addDocument('pt', 'o que', 'jokes.userJoke');
manager.addDocument('pt', 'Qual', 'jokes.userJoke');
manager.addDocument('pt', 'qual é', 'jokes.userJoke');
manager.addDocument('pt', 'qual', 'jokes.userJoke');

// exemplos extras
manager.addAnswer('pt', 'jokes.practice.confirm', 'Ótimo! Comece contando uma piada, e eu vou te ajudar a aprimorá-la.');
manager.addAnswer('pt', 'jokes.userJoke', 'Legal, gostei da sua piada! Se quiser, posso ajudar a aprimorá-la ou contar uma outra.');
manager.addAnswer('pt', 'jokes.userJoke', 'Esssa piada esta muito boa HAHAHAHAHAHA!');
manager.addAnswer('pt', 'jokes.userJoke', 'Piada de tiozão em...');
manager.addAnswer('pt', 'jokes.userJoke', 'rsrsrs...');
manager.addAnswer('pt', 'greetings.greeting', 'Bom dia! Como vai?');
manager.addAnswer('pt', 'greetings.how_user_are', 'Ai sim chefe! Como posso tá te ajudando hoje?');
manager.addAnswer('pt', 'greetings.how_user_are', 'Que maravilha! Como devo te ajudar hoje?');
manager.addAnswer('pt', 'greetings.hello', 'Olá! Como posso te ajudar hoje?');
manager.addAnswer('pt', 'greetings.how_are_you', 'Estou aqui, pronto para rir com você! E você?');
manager.addAnswer('pt', 'jokes.tips', 'Uma boa piada deve ter um setup envolvente e uma punchline surpreendente. Tente usar jogos de palavras ou reviravoltas para deixar tudo mais divertido!');
manager.addAnswer('pt', 'jokes.practice', 'Ótimo! Vamos praticar! Comece contando uma piada, e eu vou te ajudar a aprimorá-la.');
manager.addAnswer('pt', 'jokes.how_to_tell', 'Para contar uma boa piada, comece com uma introdução que prenda a atenção e finalize com um desfecho inesperado. Você gostaria de praticar?');

// Respostas para as intenções de contar piada
manager.addAnswer('pt', 'jokes.tell', 'Ok, aqui vai uma piada para você!');
manager.addAnswer('pt', 'jokes.evaluate.good', 'Que bom que você gostou! Posso te contar outra?');
manager.addAnswer('pt', 'jokes.evaluate.bad', 'Desculpa, vou tentar contar outra melhor na próxima!');
manager.addAnswer('pt', 'jokes.confirmation', 'Aqui vai a segunda parte da piada!');
manager.addAnswer('pt', 'jokes.explain', 'A piada brinca com a linguagem ou a lógica, muitas vezes fazendo uma comparação inusitada.');

// Resposta para pedir mais piadas
manager.addAnswer('pt', 'jokes.tell.another', 'Claro! Aqui vai outra piada: ');
manager.addAnswer('pt', 'jokes.tell.another', 'Certo, espero que você goste dessa: ');
manager.addAnswer('pt', 'jokes.tell.another', 'Vamos lá! Aqui está mais uma: ');

// Explicações variadas
manager.addAnswer('pt', 'jokes.explain', 'A piada é engraçada porque joga com as expectativas do ouvinte e cria um contraste inesperado.');


const trainNLP = async () => {
    await manager.train();
    manager.save();
};


const processInput = async (text) => {
    const response = await manager.process('pt', text);
    return response;
};



module.exports = { trainNLP, processInput };
