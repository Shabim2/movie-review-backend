exports.up = function(knex) {
    return knex.schema.createTable('movies', table =>{
        table.increments();
        table.string('title', 50)
        table.string('plot',250)
        table.string('cast', 500)
        table.string('genre', 50)
        table.string('image',1000)
        table.date('releaseDate')
    })
  }
  
exports.down = function(knex) {
    return knex.schema.dropTable('movies')
}