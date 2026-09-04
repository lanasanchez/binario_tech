const express = require('express');
const app = express();

// 1. Importação dos roteadores
const manutencoesRouter = require('./routes/manutencoes');
const motoristasRouter = require('./routes/motoristas'); // <-- Adicione esta linha

app.use(express.json());

// 2. Registro das rotas
app.use('/api/v1/manutencoes', manutencoesRouter);
app.use('/api/v1/motoristas', motoristasRouter); // <-- Adicione esta linha!

// ... (suas importações e rotas anteriores como /manutencoes e /motoristas)

// -------------------------------------------------------------
// Middleware Global para Capturar Rotas Inexistentes (404)
// Deve ser colocado no final de todas as rotas registradas!
// -------------------------------------------------------------
app.use((req, res, next) => {
  res.status(404).json({
    sucesso: false,
    erro: `Rota não encontrada: ${req.originalUrl}`
  });
});

// Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
