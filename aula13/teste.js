const { regrasCadastroVeiculo } = require('./src/middlewares/veiculoValidator');

// Caso 1: Teste com placa minúscula e ano válido
const reqValida = { 
  body: { 
    placa: 'abc1234',
    anoFabricacao: 2022 
  } 
};

Promise.all(regrasCadastroVeiculo.map(validation => validation.run(reqValida))).then(() => {
  console.log('--- TESTE 1 (Dados válidos) ---');
  console.log('Placa tratada:', reqValida.body.placa); // ABC1234
  console.log('Ano enviado:', reqValida.body.anoFabricacao); // 2022
});
