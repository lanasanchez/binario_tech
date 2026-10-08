const express = require('express');
const app = express();
const PORT = 3400;

app.get('/api/v1/vw', (req, res) => {
  res.json({
    montadora: "Volkswagen",
    modelo: "Constellation",
    status: "OK",
    conexao: true,
    velocidade_media: 78
  });
});

app.get('/api/v1/scania', (req, res) => {
  res.json({
    montadora: "Scania",
    modelo: "R450",
    status: "OK",
    conexao: true,
    velocidade_media: 80
  });
});

// ADICIONE ESTA PARTE
app.get('/api/v1/mercedes', (req, res) => {
  res.json({
    montadora: "Mercedes-Benz",
    modelo: "Actros",
    status: "OK",
    conexao: true,
    velocidade_media: 75
  });
});

// ADICIONE ESTA PARTE TAMBÉM
app.get('/api/v1/volvo', (req, res) => {
  res.json({
    montadora: "Volvo",
    modelo: "FH 540",
    status: "OK",
    conexao: true,
    velocidade_media: 82
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
