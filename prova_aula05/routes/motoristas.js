const express = require('express');
const router = express.Router();

// IMPORTANTE: Importar o middleware de validação da CNH
const validaCnh = require('../middlewares/validaCnh');

const motoristas = [];
let proximoId = 1;

// GET /api/v1/motoristas
router.get('/', (req, res) => {
  return res.status(200).json(motoristas);
});

// POST /api/v1/motoristas (Adicionado o middleware validaCnh aqui)
router.post('/', validaCnh, (req, res) => {
  const { nome, cnh, categoria } = req.body;

  if (!nome || !cnh || !categoria) {
    return res.status(400).json({
      erro: "Campos 'nome', 'cnh' e 'categoria' sao obrigatorios."
    });
  }

  const novoMotorista = {
    id: proximoId++,
    nome,
    cnh,
    categoria,
    ativo: true
  };

  motoristas.push(novoMotorista);

  return res.status(201).json(novoMotorista);
});

module.exports = router;
