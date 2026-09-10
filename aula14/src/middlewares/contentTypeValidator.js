const verificarContentType = (req, res, next) => {
  // Executa a validação apenas para o método POST
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];

    // Verifica se o cabeçalho existe e se inclui application/json
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        erro: 'O cabeçalho Content-Type deve ser application/json para requisições POST.'
      });
    }
  }

  // Se não for POST ou se o cabeçalho for válido, prossegue
  next();
};

module.exports = verificarContentType;
