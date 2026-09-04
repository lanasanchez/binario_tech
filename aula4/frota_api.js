const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Simulação do banco de dados na memória
let veiculos = [
  { id: 1, placa: "ABC-1234", montadora: "Scania", modelo: "R450", status: "DISPONIVEL" },
  { id: 2, placa: "XYZ-5678", montadora: "Volvo", modelo: "FH 540", status: "MANUTENCAO" }
];

// 1. GET /api/v1/veiculos - Listar todos os veículos
app.get('/api/v1/veiculos', (req, res) => {
  return res.status(200).json(veiculos);
});

// 2. GET /api/v1/veiculos/:id - Buscar veículo por ID
app.get('/api/v1/veiculos/:id', (req, res) => {
  const { id } = req.params;
  const veiculo = veiculos.find(v => v.id === parseInt(id));

  if (!veiculo) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }

  return res.status(200).json(veiculo);
});

// 3. POST /api/v1/veiculos - Cadastrar novo veículo
app.post('/api/v1/veiculos', (req, res) => {
  const { placa, montadora, modelo, status } = req.body;

  if (!placa || !montadora || !modelo || !status) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const novoVeiculo = {
    id: veiculos.length > 0 ? veiculos[veiculos.length - 1].id + 1 : 1,
    placa,
    montadora,
    modelo,
    status
  };

  veiculos.push(novoVeiculo);
  return res.status(201).json(novoVeiculo);
});

// 4. PUT /api/v1/veiculos/:id - Substituir todos os dados do veículo
app.put('/api/v1/veiculos/:id', (req, res) => {
  const { id } = req.params;
  const { placa, montadora, modelo, status } = req.body;

  const index = veiculos.findIndex(v => v.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }

  if (!placa || !montadora || !modelo || !status) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  veiculos[index] = { id: parseInt(id), placa, montadora, modelo, status };
  return res.status(200).json({ mensagem: "Veiculo atualizado com sucesso!", veiculo: veiculos[index] });
});

// 5. PATCH /api/v1/veiculos/:id/status - Atualizar apenas o status do veículo
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const veiculo = veiculos.find(v => v.id === parseInt(id));

  if (!veiculo) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }

  if (!status) {
    return res.status(400).json({ erro: "O campo status e obrigatorio." });
  }

  veiculo.status = status;
  return res.status(200).json({ mensagem: "Status atualizado com sucesso!", veiculo });
});

// 6. DELETE /api/v1/veiculos/:id - Deletar um veículo
app.delete('/api/v1/veiculos/:id', (req, res) => {
  const { id } = req.params;
  const index = veiculos.findIndex(v => v.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }

  veiculos.splice(index, 1);
  return res.status(200).json({ mensagem: "Veiculo removido com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
