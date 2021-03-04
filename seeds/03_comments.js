
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          comment: 'Great Movie!', 
          movie: 1,
          user: 1,
        },
        {
          comment: 'Good Movie!', 
          movie: 2,
          user: 2,
        },
        {
          comment: 'Okay Movie!', 
          movie: 3,
          user: 3,
        }
      ]);
    });
};
