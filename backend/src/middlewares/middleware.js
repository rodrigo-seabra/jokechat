const Token = require("../helpers/token");

module.exports = class Middlewares {
    static requestLimiter() {
        const requests = new Map();

        return async (req, res, next) => {
            const ip = req.ip; 
            const currentTime = Date.now();

            // Verifica se o usuário está autenticado
            if (!req.user) {
                // Se não há registro para o IP, inicializa
                if (!requests.has(ip)) {
                    requests.set(ip, { count: 1, firstRequestTime: currentTime });
                } else {
                    const requestInfo = requests.get(ip);
                    const elapsedTime = currentTime - requestInfo.firstRequestTime;

                    // Se passaram mais de 60 segundos desde a primeira requisição
                    if (elapsedTime > 60000) {
                        requests.set(ip, { count: 1, firstRequestTime: currentTime });
                    } else {
                        // Se não atingiu o limite de 3 requisições
                        if (requestInfo.count < 3) {
                            requestInfo.count++;
                        } else {
                            console.log(`Limite de requisições excedido para o IP: ${ip}`);
                            return res.status(429).json({ message: 'Limite de requisições excedido. Tente novamente mais tarde.' });
                        }
                    }
                }
            } else {
                console.log(`Usuário autenticado: ${req.user.name}`);
            }

            next(); // Chama o próximo middleware
        };
    }
};
