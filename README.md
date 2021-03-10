# Movie Review FrontEnd
Node Express backend using knex ORM for database interactions

## Local Setup

### Postgres
brew install postgres 
psql postgres
CREATE DATABASE moviereview;

### Database Migrations/seeds
npx knex migrate:lastest && npx knex seed:run

## Development Server
Run `npm start` to get a dev server, `http://localhost:8080/`