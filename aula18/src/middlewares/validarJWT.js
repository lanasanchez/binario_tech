const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Busca o token nos cabeçalhos 'x-auth-token' ou 'Authorization' (Bearer)
  const authHeader = req.header('Authorization') || req.header('x-auth-token');

  // 1. Se o token for omitido -> Retorna HTTP 401 (Não Autorizado)
  if (!authHeader) {
    return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
  }

  // Extrai o token se for passado no formato "Bearer <token>"
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7, authHeader.length).trim()
    : authHeader;

  try {
    // 2. Tenta verificar/decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // Adiciona os dados do usuário (id e email) à requisição
    next();
  } catch (err) {
    // 3. Se for inválido ou expirado -> Retorna HTTP 403 (Proibido)
    return res.status(403).json({ msg: 'Token inválido ou expirado.' });
  }
};
