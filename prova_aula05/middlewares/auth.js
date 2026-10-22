const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const VALID_KEY = 'binario-tech-secret-2026';

  if (!apiKey || apiKey !== VALID_KEY) {
    return res.status(401).json({
      erro: "Acesso nao autorizado. Header 'X-API-KEY' invalido ou ausente."
    });
  }

  next();
};

module.exports = auth;
