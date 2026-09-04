const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Rota de status geral do servidor
app.get('/status', (req, res) => {
    res.json({ status: "OK", servidor: "Binario Tech Operacional" });
});

// Rotas da API v1
app.get('/api/v1/scania', (req, res) => {
    res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82 });
});

app.get('/api/v1/mercedes', (req, res) => {
    res.json({ montadora: "Mercedes-Benz", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 78 });
});

app.get('/api/v1/vw', (req, res) => {
    res.json({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

// Rotas solicitadas no exercício
app.get('/scania/info', (req, res) => {
    res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82 });
});

app.get('/vw/info', (req, res) => {
    res.json({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

app.listen(PORT, () => {
    console.log(`[Binario Tech] Servidor rodando em http://localhost:${PORT}`);
});
