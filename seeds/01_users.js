
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "admin", password: 'password',role:'admin'},
        {username: "user1", password: 'password',role:'user'},
        {username: "user2", password: 'password',role:'user'},
        {username: "user3", password: 'password',role:'user'},
        {username: "user4", password: 'password',role:'user'}
      ]);
    });
};
