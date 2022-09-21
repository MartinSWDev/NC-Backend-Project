# NC Backend Project

![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=flat-square&logo=jest&logoColor=white)
![Heroku](https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku)

Welcome to my **API** project, created as part of the [Northcoders](https://northcoders.com/) bootcamp. This API was created using **TDD** and forms the back-end foundation of a React front-end project currently being built. You can make HTTP requests to the endpoints listed on the hosted version below. You can find more detail on all endpoints by making a request to the **/api** endpoint

## Hosted API

[You can find the hosted version of the API here](https://martinswdev-be-nc-games.herokuapp.com/)

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv)
- [express.js](https://expressjs.com/)
- [postgreSQL](https://www.postgresql.org/)
- [pg-format](https://www.npmjs.com/package/pg-format)

## Dev-Dependencies

- [husky](https://www.npmjs.com/package/husky)
- [jest](https://jestjs.io/)
- [jest-extended](https://www.npmjs.com/package/jest-extended)
- [jest-sorted](https://www.npmjs.com/package/jest-sorted)

## Set Up Instructions

### Install dependencies

Run

```
npm install
```

### Set Up Environment Variables.

In order to connect to the database that `setup.sql` will create ( you can find this file in `~/db/setup.sql` ) we will need to create `.env` files that follow the `~/.env-example` format of:

```
PGDATABASE=your_database_name_here
```

for both the test and development databases.

In the project root directory create the following `.env` files

`.env.development`

`.env.test`

Each of these `.env` files should contain the database names outlined in `~/db/setup.sql`
These are currently labelled as

```
nc_games
```

and

```
nc_games_test
```

But could be changed to any name you like as long as they match your `.env` files.

### Setup Database

Before running any further tests or files, run the setup-dbs script in order to setup your databases.

NOTE: This step assumes you have PostgreSQL setup correctly
https://www.postgresql.org/

```
npm run setup-dbs
```

Following this run

```
npm run seed
```

to seed the development database.

### Start server

```
npm start
```

## Testing

This API was created using Test Driven Development. All of the test used can be found in the `~/__tests__` directory.

These tests can be run with the following command from the project root directory.

```
npm test
```

The test database is re-seeded before each test.

## .gitignore

The following have been git ignored:

`node_modules`

`.env.*`
