
exports.up = function(knex) {
  return knex.schema.createTable('livros',function(table){
    table.increments();
    table.string('nome_livro').notNullable();
    table.string('descricao_livro');
    table.string('autor').notNullable();
    table.string('datapostagem');
    table.string('conteudo').notNullable();
    table.string('categoria').notNullable();
    table.string('comentarios')
    table.string('curtidas')
    table.string('id_usuario').notNullable();

    table.foreign('autor').references('nome').inTable('usuarios');
    table.foreign('id_usuario').references('id').inTable('usuarios');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('livros');
};
