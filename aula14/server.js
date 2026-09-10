const express = require('express');
const veiculoRoutes = require('./src/routes/veiculoRoutes');

const app = express();

// Middleware para parsing de JSON no corpo das requisições
app.use(express.json());

// Simulação de middleware de autenticação (injeta o usuário logado no req.user)
// Em produção, isso viria da validação de um token JWT real
app.use((req, res, next) => {
  req.user = {
    id: 1,
    nome: 'Lana',
    perfil: req.headers['x-perfil-usuario'] || 'USER' // Lê o perfil enviado no Header ou define 'USER' como padrão
  };
  next();
});

// Registra os pontos de entrada das rotas de veículos
app.use('/', veiculoRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
