const express = require('express');
const router = express.Router();

// Banco de dados em memória
const manutencoes = [];
let proximoId = 1;

// GET /api/v1/manutencoes
router.get('/', (req, res) => {
  return res.status(200).json(manutencoes);
});

// POST /api/v1/manutencoes
router.post('/', (req, res) => {
  const { placa, descricao, valor } = req.body;

  // Validação dos campos obrigatórios
  if (!placa || !descricao || valor === undefined) {
    return res.status(400).json({
      erro: "Campos 'placa', 'descricao' e 'valor' sao obrigatorios."
    });
  }

  const novaManutencao = {
    id: proximoId++,
    placa,
    descricao,
    valor
  };

  manutencoes.push(novaManutencao);

  return res.status(201).json(novaManutencao);
});

module.exports = router;
