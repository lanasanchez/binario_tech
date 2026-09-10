// src/routes/veiculoRoutes.js
const express = require('express');
const autorizarPerfil = require('../middlewares/autorizarPerfil');
const router = express.Router();

// Adicione esta rota se ela não estiver no arquivo!
router.delete('/veiculos/:id', autorizarPerfil(['ADMIN']), (req, res) => {
  res.json({ mensagem: 'Veículo excluído com sucesso!' });
});

module.exports = router;
