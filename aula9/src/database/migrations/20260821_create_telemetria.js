exports.up = function(knex) {
	return knex.schema.createTable('telemetria', function(table) {
		table.increments('id').primary();
		table.integer('veiculo_id').unsigned().notNullable();
		table.float('velocidade').notNullable();
		table.float('temperatura_motor').notNullable();
		table.timestamp('capturado_em').defaultTo(knex.fn.now());

		// configuracao de chave estrangeira fk
	
table.foreign('veiculo_id').references('id').inTable('veiculos').onDelete('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('telemetria');
};
