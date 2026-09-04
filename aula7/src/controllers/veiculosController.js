// Certifique-se de que o Knex está importado/configurado no topo do arquivo
// const db = require('../database/connection'); // ajuste o caminho conforme seu projeto

module.exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const veiculo = await db('veiculos').where({ id }).first();

    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    return res.status(200).json(veiculo);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar veículo.', erro: error.message });
  }
};
