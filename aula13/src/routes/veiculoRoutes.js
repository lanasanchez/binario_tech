const express = require('express');
const { validationResult } = require('express-validator');
const { regrasCadastroVeiculo } = require('../middlewares/veiculoValidator');
const verificarContentType = require('../middlewares/contentTypeValidator');

const router = express.Router();

router.post('/veiculos', verificarContentType, regrasCadastroVeiculo, (req, res) => {
	  const erros = validationResult(req);
	  if (!erros.isEmpty()) {
		      return res.status(400).json({ errors: erros.array() });
		    }

	  return res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso!' });
});

module.exports = router;
