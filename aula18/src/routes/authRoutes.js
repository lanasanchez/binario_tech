const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const validarJWT = require('../middlewares/validarJWT');

const router = express.Router();

const registerValidation = [
  check('email', 'Forneça um e-mail válido.').isEmail(),
  check('senha', 'A senha deve conter no mínimo 6 caracteres.').isLength({ min: 6 })
];

const loginValidation = [
  check('email', 'Forneça um e-mail válido.').isEmail(),
  check('senha', 'A senha é obrigatória.').notEmpty()
];

// Rotas públicas
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Rota protegida com o middleware validarJWT
router.get('/relatorio', validarJWT, authController.relatorio);

module.exports = router;
