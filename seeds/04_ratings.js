
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert([
        {movie: 1, user: 1, rating: 5},
        {movie: 2, user: 2, rating: 4},
        {movie: 2, user: 1, rating: 2},
        {movie: 3, user: 3, rating: 2}
      ]);
    });
};
