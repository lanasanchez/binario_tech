const Manutencao = require('../models/Manutencao');

exports.buscarPorPlaca = async (req, res) => {
  try {
    const { placa } = req.query;

    if (!placa) {
      return res.status(400).json({ 
        mensagem: "O parâmetro 'placa' é obrigatório na URL para realizar a busca." 
      });
    }

    const manutencoes = await Manutencao.find({
      placa: { $regex: placa, $options: 'i' }
    });

    if (manutencoes.length === 0) {
      return res.status(404).json({ 
        mensagem: `Nenhuma manutenção encontrada para a placa contendo: '${placa}'.` 
      });
    }

    return res.status(200).json(manutencoes);
  } catch (error) {
    return res.status(500).json({ 
      mensagem: "Erro ao buscar manutenções por placa.", 
      erro: error.message 
    });
  }
};
