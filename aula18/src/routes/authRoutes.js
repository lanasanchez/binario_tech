const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Validações do Cadastro
const registerValidation = [
  check('email', 'Forneça um e-mail válido.').isEmail(),
  check('senha', 'A senha deve conter no mínimo 6 caracteres.').isLength({ min: 6 })
];

// Validações do Login
const loginValidation = [
  check('email', 'E-mail válido obrigatório.').isEmail(),
  check('senha', 'Senha é obrigatória.').exists()
];

// Rotas
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

module.exports = router;
