
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        {user: 1, comment: 1, value: 1},
        {user: 1, comment: 2, value: -1},
        {user: 1, comment: 2, value: 1},
        {user: 1, comment: 2, value: 1}
      ]);
    });
}
