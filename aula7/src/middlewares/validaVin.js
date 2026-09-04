// Middleware para validação do código VIN / Chassi
const validaVin = (req, res, next) => {
  const { vin } = req.body;

  if (!vin) {
    return res.status(400).json({
      mensagem: 'O campo "vin" é obrigatório.'
    });
  }

  // Remove espaços antes de checar a extensão
  const vinTratado = String(vin).trim();

  if (vinTratado.length !== 12) {
    return res.status(400).json({
      mensagem: 'Código VIN inválido. O VIN deve conter exatamente 12 caracteres.',
      tamanhoRecebido: vinTratado.length
    });
  }

  // Atualiza o req.body com o valor limpo
  req.body.vin = vinTratado;

  next();
};

module.exports = validaVin;
