const express = require('express');
const { validationResult } = require('express-validator');
const { regrasCadastroVeiculo } = require('./src/middlewares/veiculoValidator');
const verificarContentType = require('./src/middlewares/contentTypeValidator');

const app = express();

app.use(express.json());

// Rota POST /veiculos com os middlewares aplicados
app.post('/veiculos', verificarContentType, regrasCadastroVeiculo, (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() });
  }

  return res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso!', dados: req.body });
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
