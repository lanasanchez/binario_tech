const knex = require('../database/connection');

const buscarPorVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const leituras = await knex('telemetria')
      .join('veiculos', 'telemetria.veiculo_id', '=', 'veiculos.id')
      .select('telemetria.*', 'veiculos.placa', 'veiculos.montadora', 'veiculos.modelo')
      .where('telemetria.veiculo_id', id);

    if (!leituras || leituras.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhuma leitura encontrada para este veículo.' });
    }

    return res.status(200).json(leituras);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar leituras do veículo.', erro: error.message });
  }
};

const cadastrarLeitura = async (req, res) => {
  try {
    const { veiculo_id, velocidade, temperatura_motor } = req.body;

    const veiculo = await knex('veiculos').where({ id: veiculo_id }).first();
    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    const [id] = await knex('telemetria').insert({ 
      veiculo_id, 
      velocidade,
      temperatura_motor: temperatura_motor || 90.0
    });

    return res.status(201).json({ id, veiculo_id, velocidade, temperatura_motor });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao cadastrar leitura.', erro: error.message });
  }
};

const cadastrarVeiculo = async (req, res) => {
  try {
    const { placa, montadora, modelo } = req.body;
    const [id] = await knex('veiculos').insert({ placa, montadora, modelo });
    return res.status(201).json({ id, placa, montadora, modelo });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao cadastrar veículo.', erro: error.message });
  }
};

const listarRelatorioCompleto = async (req, res) => {
  try {
    const { alerta } = req.query;

    let query = knex('telemetria')
      .join('veiculos', 'telemetria.veiculo_id', '=', 'veiculos.id')
      .select(
        'telemetria.id',
        'telemetria.veiculo_id',
        'telemetria.velocidade',
        'telemetria.temperatura_motor',
        'telemetria.capturado_em',
        'veiculos.placa',
        'veiculos.montadora',
        'veiculos.modelo'
      );

    if (alerta === 'true') {
      query = query.where('telemetria.temperatura_motor', '>', 95);
    }

    const relatorio = await query;
    return res.status(200).json(relatorio);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao gerar relatório.', erro: error.message });
  }
};

module.exports = {
  buscarPorVeiculo,
  cadastrarLeitura,
  cadastrarVeiculo,
  listarRelatorioCompleto
};
