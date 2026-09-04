const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Importar e registrar rotas
const manutencaoRoutes = require('./src/routes/manutencaoRoutes');
app.use('/api/manutencoes', manutencaoRoutes);

// Conexão com o Banco Local (Docker)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('[MONGODB]: Conectado com sucesso!'))
  .catch((err) => console.log('[ERRO MONGODB]:', err.message));

// Escutar na porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVIDOR]: Rodando na porta ${PORT}`);
});
