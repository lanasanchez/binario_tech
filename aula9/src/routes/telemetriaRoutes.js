const express = require('express');
const router = express.Router();
const telemetriaController = require('../controllers/telemetriaController');

// 1. Rota do relatório (tem que vir antes de rotas com param :id)
router.get('/relatorio', telemetriaController.listarRelatorioCompleto);

// 2. Rotas de cadastro
router.post('/veiculo-teste', telemetriaController.cadastrarVeiculo);
router.post('/', telemetriaController.cadastrarLeitura);

// 3. Rota de busca por veículo
router.get('/veiculo/:id', telemetriaController.buscarPorVeiculo);

module.exports = router;
