const verificarContentType = require('./src/middlewares/contentTypeValidator');

// Simulação de resposta HTTP (res) com mock de status e json
const criarResMock = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.body = data;
    return res;
  };
  return res;
};

// Teste 1: POST sem cabeçalho correto (Deve retornar 400)
const reqInvalida = { method: 'POST', headers: {} };
const resInvalida = criarResMock();
verificarContentType(reqInvalida, resInvalida, () => {});

console.log('--- TESTE 1 (Inválido) ---');
console.log('Status:', resInvalida.statusCode); // 400
console.log('Resposta:', resInvalida.body);

// Teste 2: POST com cabeçalho correto (Deve chamar o next)
let nextChamado = false;
const reqValida = { method: 'POST', headers: { 'content-type': 'application/json' } };
const resValida = criarResMock();
verificarContentType(reqValida, resValida, () => { nextChamado = true; });

console.log('\n--- TESTE 2 (Válido) ---');
console.log('Avançou para o próximo handler (next)?', nextChamado); // true
