exports.seed = async function(knex) {
  // Cria a tabela 'veiculos' se ela ainda não existir no banco
  const exists = await knex.schema.hasTable('veiculos');
  if (!exists) {
    await knex.schema.createTable('veiculos', (table) => {
      table.increments('id').primary();
      table.string('marca');
      table.string('modelo');
      table.integer('ano');
    });
  }

  // Insere os novos veículos sem apagar nada
  await knex('veiculos').insert([
    { marca: 'Mercedes-Benz', modelo: 'Actros', ano: 2023 },
    { marca: 'DAF', modelo: 'XF', ano: 2024 }
  ]);
};
