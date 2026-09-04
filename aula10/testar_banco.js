const knex = require('knex')(require('./knexfile').development);

async function consultarVeiculos() {
  try {
    const veiculos = await knex('veiculos').select('*');
    console.log('--- VEÍCULOS NO BANCO DE DADOS ---');
    console.table(veiculos);
  } catch (error) {
    console.error('Erro ao consultar banco:', error);
  } finally {
    await knex.destroy();
  }
}

consultarVeiculos();
