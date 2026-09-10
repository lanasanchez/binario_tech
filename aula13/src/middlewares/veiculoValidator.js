const { body } = require('express-validator');

const anoAtual = new Date().getFullYear();

const regrasCadastroVeiculo = [
  body('placa')
    .customSanitizer(valor => typeof valor === 'string' ? valor.toUpperCase() : valor),
  
  body('anoFabricacao')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 2000, max: anoAtual })
    .withMessage(`O ano de fabricação deve ser um número inteiro entre 2000 e ${anoAtual}.`)
];

module.exports = { regrasCadastroVeiculo };
