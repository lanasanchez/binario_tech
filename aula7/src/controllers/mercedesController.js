// Simulação de banco de dados em memória
let frota = [
  {
    id: 1,
    modelo: 'Actros',
    versao: '2651 6x4',
    ano: 2023,
    placa: 'ABC-1234',
    capacidadeCargaTons: 57,
    status: 'Disponível'
  },
  {
    id: 2,
    modelo: 'Atego',
    versao: '1719 4x2',
    ano: 2022,
    placa: 'XYZ-5678',
    capacidadeCargaTons: 17,
    status: 'Em Trânsito'
  }
];

// Listar todos os caminhões (com filtro opcional por modelo: Actros ou Atego)
const getCaminhoes = (req, res) => {
  const { modelo } = req.query;

  if (modelo) {
    const filtrados = frota.filter(
      c => c.modelo.toLowerCase() === modelo.toLowerCase()
    );
    return res.status(200).json(filtrados);
  }

  return res.status(200).json(frota);
};

// Obter caminhão por ID
const getCaminhaoById = (req, res) => {
  const { id } = req.params;
  const caminhao = frota.find(c => c.id === parseInt(id));

  if (!caminhao) {
    return res.status(404).json({ mensagem: 'Caminhão não encontrado.' });
  }

  return res.status(200).json(caminhao);
};

// Adicionar novo caminhão à frota
const createCaminhao = (req, res) => {
  const { modelo, versao, ano, placa, capacidadeCargaTons, status } = req.body;

  // Validação simples dos modelos aceitos
  const modelosPermitidos = ['Actros', 'Atego'];
  if (!modelosPermitidos.some(m => m.toLowerCase() === modelo?.toLowerCase())) {
    return res.status(400).json({ 
      mensagem: 'Modelo inválido. Permita apenas "Actros" ou "Atego".' 
    });
  }

  if (!versao || !ano || !placa) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios ausentes.' });
  }

  const novoCaminhao = {
    id: frota.length ? frota[frota.length - 1].id + 1 : 1,
    modelo,
    versao,
    ano,
    placa,
    capacidadeCargaTons: capacidadeCargaTons || 0,
    status: status || 'Disponível'
  };

  frota.push(novoCaminhao);
  return res.status(201).json(novoCaminhao);
};

// Atualizar dados de um caminhão
const updateCaminhao = (req, res) => {
  const { id } = req.params;
  const index = frota.findIndex(c => c.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Caminhão não encontrado.' });
  }

  const { modelo, versao, ano, placa, capacidadeCargaTons, status } = req.body;

  if (modelo) {
    const modelosPermitidos = ['Actros', 'Atego'];
    if (!modelosPermitidos.some(m => m.toLowerCase() === modelo.toLowerCase())) {
      return res.status(400).json({ 
        mensagem: 'Modelo inválido. Permita apenas "Actros" ou "Atego".' 
      });
    }
  }

  frota[index] = {
    ...frota[index],
    ...(modelo && { modelo }),
    ...(versao && { versao }),
    ...(ano && { ano }),
    ...(placa && { placa }),
    ...(capacidadeCargaTons !== undefined && { capacidadeCargaTons }),
    ...(status && { status })
  };

  return res.status(200).json(frota[index]);
};

// Remover caminhão da frota
const deleteCaminhao = (req, res) => {
  const { id } = req.params;
  const index = frota.findIndex(c => c.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Caminhão não encontrado.' });
  }

  frota.splice(index, 1);
  return res.status(204).send();
};

module.exports = {
  getCaminhoes,
  getCaminhaoById,
  createCaminhao,
  updateCaminhao,
  deleteCaminhao
};
