const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

// ESTA PARTE Mantém o Node rodando:
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORTA}`);
}); 
