const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = class Token {
    static async createUserToken(user, req, res) {
        const token = jwt.sign(
            {
                name: user.name,
                id: user._id,
            },
            "segredosecretojokes"
        );

        res.status(200).json({
            message: "Você está autenticado!",
            token: token,
            userId: user._id,
        });
    }

    static async getToken(req) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        return token;
    }

    static async checkToken(req, res, next) {
        if (!req.headers.authorization) {
            return next(); 
        }

        const token = await this.getToken(req); 

        if (!token) {
            return next(); 
        }

        try {
            const verified = jwt.verify(token, "segredosecretojokes");
            req.user = verified; 
            return next(); 
        } catch (err) {
            return res.status(400).json({ message: "Token inválido!" });
        }
    }

    static async getUserByToken(token) {
        if (!token) {
            return res.status(401).json({ message: "Acesso negado!" });
        }

        const decoded = jwt.verify(token, "segredosecretojokes");
        const id = decoded.id;
        const user = await User.findById(id);

        return user;
    }
}
