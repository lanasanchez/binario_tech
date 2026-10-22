const validaCnh = (req, res, next) => {
  const { cnh } = req.body;

  // Valida se cnh existe, é string e contém exatamente 11 dígitos numéricos
  const cnhValida = typeof cnh === 'string' && /^\d{11}$/.test(cnh);

  if (!cnhValida) {
    return res.status(400).json({
      erro: "CNH invalida. A CNH deve conter exatamente 11 digitos numericos."
    });
  }

  next();
};

module.exports = validaCnh;
