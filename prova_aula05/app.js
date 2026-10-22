const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({
    status: "ONLINE",
    aplicacao: "Binario Tech API v2"
  });
});

app.use('/api/v1/motoristas', auth, motoristasRouter);
app.use('/api/v1/manutencoes', auth, manutencoesRouter);

// TRATAMENTO GLOBAL DE ERRO 404
app.use((req, res) => {
  return res.status(404).json({
    erro: "Endpoint nao encontrado no servidor Binario Tech."
  });
});

module.exports = app;
