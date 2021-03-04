exports.up = function(knex) {
    return knex.schema.createTable('likes', table =>{
        table.increments();
        table.integer('comment').unsigned().notNullable().references('id').inTable('comments').onDelete('CASCADE')
        table.integer('user').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
        table.integer('value')
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('likes')
}

