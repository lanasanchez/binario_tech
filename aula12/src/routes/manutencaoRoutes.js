const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');

// Rota GET para buscar por placa via query params: /api/manutencoes/buscar?placa=xyz
router.get('/buscar', manutencaoController.buscarPorPlaca);

module.exports = router;
