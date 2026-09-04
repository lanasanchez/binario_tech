// middlewares/validaApiKey.js

const validaApiKey = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Verifica se o cabeçalho Authorization foi enviado e se contém a chave
  if (!authHeader || authHeader !== 'Bearer SEU_TOKEN_AQUI') {
    return res.status(401).json({
      sucesso: false,
      erro: 'Acesso negado: Chave de API ou Token inválido/ausente.'
    });
  }

  next();
};

module.exports = validaApiKey;
