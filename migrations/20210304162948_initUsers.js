exports.up = function(knex) {
    return knex.schema.createTable('users', table =>{
        table.increments();
        table.string('username', 30).unique()
        table.string('password',20)
        table.string('role', 20)
    })
  }
  
exports.down = function(knex) {
    return knex.schema.dropTable('users')
}