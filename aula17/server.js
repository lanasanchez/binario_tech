const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3333;
const JWT_SECRET = process.env.JWT_SECRET || 'secreta_para_testes_simulado';

app.use(express.json());

// Rota pública para geração do Token JWT
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

// Middleware de autenticação JWT
const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
};

// Rota protegida do simulado
app.get('/api/v1/simulado/status', autenticarToken, (req, res) => {
  return res.status(200).json({
    status: 'em_andamento',
    user: {
      id: req.user.id,
      name: 'Lana Sanchez'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
