// Conexao com o Knex utilizando o knexfile da raiz
const knexfile = require('../../knexfile');
const db = require('knex')(knexfile.development || knexfile);

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const veiculo = await db('veiculos').where({ id }).first();

    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    return res.status(200).json(veiculo);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.', erro: error.message });
  }
};

module.exports = {
  buscarPorId
};
