const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../helpers/token");


module.exports = class userController{

    static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" }); 
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" }); 
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" }); 
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" }); 
      return;
    }
    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" }); 
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais!",
      }); 
      return;
    }
    //check if user exists - verificando se o user existe
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message: "Por favor utilize outro e-mail",
      }); 
      return;
    }

    //CREATE A PASSWORD - pois nunca salvamos a senha do user no banco
    const salt = await bcrypt.genSalt(12); //12 caracteres a mais
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await Token.createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    //validations
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" }); 
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" }); 
      return;
    }

    //check if user exists - verificando se o user existe
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: "Não há usuário cadastrado com esse e-mail",
      }); 
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({
        message: "Senha inválida",
      }); 
      return;
    }

    await Token.createUserToken(user, req, res);
  }
  static async checkUser(req, res) {
    let currentUser;
    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = Token.getToken(req);

      const decoded = jwt.verify(token, "segredosecretojokes");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password"); //método select do mongoose, onde eu passo dentro de ("") um string com o simbolo de - e em seguida o nome do campo que eu desejo remover

    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado",
      });
      return;
    }

    res.status(200).json({ user });
  }

};