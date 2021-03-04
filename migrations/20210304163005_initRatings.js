exports.up = function(knex) {
    return knex.schema.createTable('ratings', table =>{
        table.increments();
        table.integer('movie').unsigned().notNullable().references('id').inTable('movies').onDelete('CASCADE')
        table.integer('user').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
        table.integer('rating')
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('ratings')
}