require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/binario_tech_prova')
  .then(() => console.log('MongoDB Conectado...'))
  .catch((err) => console.error('Erro no MongoDB:', err));

// MONTAGEM DAS ROTAS: Importante o prefixo /api/v1/prova
app.use('/api/v1/prova', authRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
