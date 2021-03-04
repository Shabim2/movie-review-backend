
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
        releaseDate: '1988-07-22',
        image: "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"},
        {title: "Die Hard 2", 
        plot: 'New York City policeman John McClane (Bruce Willis) is visiting his estranged wife (Bonnie Bedelia) and two daughters on Christmas Eve.',
        cast: "Bruce Willis, Alan Rickman, Bonnie Bedella",
        genre: "Romance",
        releaseDate: '1989-07-22',
        image: 'https://m.media-amazon.com/images/M/MV5BMzMzYzk3ZTEtZDg0My00MTY5LWE3ZmQtYzNhYjhjN2RhZGRjL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg'},
        {title: "Die Hard 3", 
        plot: 'New York City policeman John McClane (Bruce Willis) is visiting his estranged wife (Bonnie Bedelia) and two daughters on Christmas Eve.',
        cast: "Bruce Willis, Alan Rickman, Bonnie Bedella",
        genre: "Comedy",
        releaseDate: '1990-07-22',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Die_Hard_With_A_Vengance.jpg/220px-Die_Hard_With_A_Vengance.jpg'}
      ]);
    });
};
