
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          comment: 'Great Movie!', 
          movie: 1,
          user: 2,
          rating: 5,
          username: 'user1'
        },
        {
          comment: 'Good Movie!', 
          movie: 2,
          user: 3,
          rating: 4,
          username: 'user2'
        },
        {
          comment: 'Not good', 
          movie: 2,
          user: 2,
          rating: 2,
          username:'user3'
        },
        {
          comment: 'Okay Movie!', 
          movie: 3,
          user: 4,
          rating: 1,
          username:'user4'
        }
      ]);
    });
};
