const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3400;

// Banco de dados em memória inicial
let veiculos = [
  { id: 1, placa: 'ABC-1234', montadora: 'Volvo', modelo: 'FH 540', status: 'DISPONIVEL' },
  { id: 2, placa: 'DEF-5678', montadora: 'Scania', modelo: 'R 450', status: 'DISPONIVEL' },
  { id: 3, placa: 'GHI-9012', montadora: 'Mercedes-Benz', modelo: 'Actros', status: 'EM_ROTA' }
];

let proximoId = 4;

// 1. GET /api/v1/veiculos - Lista veículos (filtro por ?status=)
app.get('/api/v1/veiculos', (req, res) => {
  const { status } = req.query;

  if (status) {
    const veiculosFiltrados = veiculos.filter(v => v.status.toUpperCase() === status.toUpperCase());
    return res.status(200).json(veiculosFiltrados);
  }

  return res.status(200).json(veiculos);
});

// 2. GET /api/v1/veiculos/:id - Busca por ID
app.get('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const veiculo = veiculos.find(v => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
  }

  return res.status(200).json(veiculo);
});

// 3. POST /api/v1/veiculos - Cadastra veículo
app.post('/api/v1/veiculos', (req, res) => {
  const { placa, montadora, modelo } = req.body;

  if (!placa || !montadora || !modelo) {
    return res.status(400).json({ 
      mensagem: 'Os campos "placa", "montadora" e "modelo" são obrigatórios.' 
    });
  }

  const novoVeiculo = {
    id: proximoId++,
    placa,
    montadora,
    modelo,
    status: 'DISPONIVEL'
  };

  veiculos.push(novoVeiculo);
  return res.status(201).json(novoVeiculo);
});

// 4. PUT /api/v1/veiculos/:id - Substituição completa (DESAFIO 3)
app.put('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { placa, montadora, modelo, status } = req.body;

  if (!placa || !montadora || !modelo || !status) {
    return res.status(400).json({ 
      mensagem: 'Os campos "placa", "montadora", "modelo" e "status" são obrigatórios para atualização completa (PUT).' 
    });
  }

  const veiculo = veiculos.find(v => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
  }

  veiculo.placa = placa;
  veiculo.montadora = montadora;
  veiculo.modelo = modelo;
  veiculo.status = status;

  return res.status(200).json(veiculo);
});

// 5. PATCH /api/v1/veiculos/:id/status - Atualiza apenas o status
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ mensagem: 'O campo "status" é obrigatório.' });
  }

  const veiculo = veiculos.find(v => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
  }

  veiculo.status = status;
  return res.status(200).json(veiculo);
});

// 6. DELETE /api/v1/veiculos/:id - Remove o veículo
app.delete('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
  }

  veiculos.splice(index, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
