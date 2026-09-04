const express = require('express');
const app = express();
const PORT = 3001;

app.get('/api/v1/vw', (req, res) => {
  res.json({
    montadora: "Volkswagen",
    modelo: "Constellation",
    status: "OK",
    conexao: true,
    velocidade_media: 78
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
