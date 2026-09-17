router.post('/login', [
  check('email', 'E-mail válido obrigatório.').isEmail(),
  check('senha', 'Senha é obrigatória.').exists()
], authController.login);
