const autorizarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    // Pega o perfil salvo no req.user (injetado pelo middleware de autenticação JWT)
    const perfilUsuario = req.user?.perfil;

    if (!perfilUsuario) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
    }

    // Verifica se o perfil do usuário está dentro do array de perfis permitidos
    if (!perfisPermitidos.includes(perfilUsuario)) {
      return res.status(403).json({ mensagem: 'Acesso negado: perfil não autorizado.' });
    }

    return next();
  };
};

module.exports = autorizarPerfil;
