const express = require('express');
const router = express.Router();
const veiculosController = require('./src/controllers/veiculosController'); // ajuste o caminho se necessário

// ✅ CORRETO: mapeia a rota GET para a função buscarPorId do controller
router.get('/veiculos/:id', veiculosController.buscarPorId);

module.exports = router;
