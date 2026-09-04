exports.up = function(knex) {
  return knex.schema.alterTable('veiculos', function(table) {
    table.string('status');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('veiculos', function(table) {
    table.dropColumn('status');
  });
};
