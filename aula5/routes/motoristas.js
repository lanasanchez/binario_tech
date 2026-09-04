const express = require('express');
const router = express.Router();
const validaCnh = require('../middlewares/validaCnh');

// Rota POST com o validaCnh aplicado
router.post('/', validaCnh, (req, res) => {
  const { nome, cnh } = req.body;
  
  return res.status(201).json({
    sucesso: true,
    mensagem: 'Motorista cadastrado com sucesso!',
    dados: { nome, cnh }
  });
});

module.exports = router;
