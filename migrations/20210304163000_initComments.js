exports.up = function(knex) {
    return knex.schema.createTable('comments', table =>{
        table.increments();
        table.string('comment', 250)
        table.integer('movie').unsigned().notNullable().references('id').inTable('movies').onDelete('CASCADE')
        table.integer('user').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
        table.timestamps(true, true)
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('comments')
}
