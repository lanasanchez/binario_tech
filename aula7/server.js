// server.js
const express = require('express');

// Importação das rotas da Mercedes-Benz
const mercedesRoutes = require('./src/routes/mercedesRoutes');

const app = express();

// Middleware obrigatório para interpretar o JSON no corpo das requisições
app.use(express.json());

// Conexão do roteador sob o caminho /api/v1/telemetria/mercedes
app.use('/api/v1/telemetria/mercedes', mercedesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor de Telemetria rodando na porta ${PORT}`);
  console.log(`Endpoints ativos em: http://localhost:${PORT}/api/v1/telemetria/mercedes`);
});
