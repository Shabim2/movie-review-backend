
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {title: "Die Hard", 
        plot: 'New York City policeman John McClane (Bruce Willis) is visiting his estranged wife (Bonnie Bedelia) and two daughters on Christmas Eve.',
        cast: "Bruce Willis, Alan Rickman, Bonnie Bedella",
        genre: "Action",
        releaseDate: '1988-07-22'},
        {title: "Die Hard 2", 
        plot: 'New York City policeman John McClane (Bruce Willis) is visiting his estranged wife (Bonnie Bedelia) and two daughters on Christmas Eve.',
        cast: "Bruce Willis, Alan Rickman, Bonnie Bedella",
        genre: "Romance",
        releaseDate: '1989-07-22'},
        {title: "Die Hard 3", 
        plot: 'New York City policeman John McClane (Bruce Willis) is visiting his estranged wife (Bonnie Bedelia) and two daughters on Christmas Eve.',
        cast: "Bruce Willis, Alan Rickman, Bonnie Bedella",
        genre: "Comedy",
        releaseDate: '1990-07-22'}
      ]);
    });
};
