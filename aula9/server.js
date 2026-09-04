const express = require('express');
const app = express();

app.use(express.json());

// Importação direta do router
const telemetriaRoutes = require('./src/routes/telemetriaRoutes');

// Registro da rota
app.use('/api/v1/telemetria', telemetriaRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
