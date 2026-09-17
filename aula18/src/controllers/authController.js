const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Endpoint de Registro
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, senha } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já cadastrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    user = new User({
      email,
      senha: senhaHash
    });

    await user.save();

    return res.status(201).json({
      msg: 'Usuário cadastrado com sucesso!',
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erro interno no servidor.');
  }
};

// Endpoint de Login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erro no servidor.');
  }
};
