const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3333;
const JWT_SECRET = process.env.JWT_SECRET || 'secreta_para_testes_simulado';

app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({ status: 'OK' });
});

app.post('/api/v1/auth/token-teste', (req, res) => {
  const payload = { id: 'user_teste_123', role: 'tester', simulado: true };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });

  return res.status(200).json({
    success: true,
    message: 'Token de teste gerado com sucesso.',
    token,
    expiresIn: '5m'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
