const express = require('express');
const router = express.Router();
const mercedesController = require('../controllers/mercedesController');

// Rota para listar todos os caminhões
router.get('/', mercedesController.listarTodos);

// Rota para cadastrar um caminhão
router.post('/', mercedesController.criar);

module.exports = router;
