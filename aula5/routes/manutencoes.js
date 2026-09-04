const express = require('express');
const router = express.Router();

// 1. Importa o middleware validaCnh
const validaCnh = require('../middlewares/validaCnh');

// 2. Rota GET protegida com validaCnh
router.get('/', validaCnh, (req, res) => {
  res.status(200).json({
    sucesso: true,
    total: 1,
    dados: [
      {
        id: 1,
        placaCaminhao: "ABC-1234",
        descricao: "Troca de óleo e filtro",
        valorOrcamento: 850,
        status: "Aprovado",
        data: "2026-08-07"
      }
    ]
  });
});

module.exports = router;
