const express = require('express');
const cors = require('cors');

// Importação dos Middlewares
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');

// Importação dos Roteadores
const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(logger);

// Rota Pública
app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({
    status: "ONLINE",
    aplicacao: "Binario Tech API v2"
  });
});

// Rotas Protegidas registradas com o middleware 'auth'
app.use('/api/v1/motoristas', auth, motoristasRouter);
app.use('/api/v1/manutencoes', auth, manutencoesRouter);

module.exports = app;
