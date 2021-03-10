
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        {user: 2, comment: 1, value: 1},
        {user: 4, comment: 2, value: -1},
        {user: 3, comment: 2, value: 1},
        {user: 2, comment: 2, value: 1}
      ]);
    });
}
