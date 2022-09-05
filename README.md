# NC Backend Project

## Project Trello

https://trello.com/b/zlUxNoND/be-nc-games

## Set Up Instructions

1. Environment Variables.

Create .env files for development and test database connections.

```
.env.development
.env.test
```

These files should be of the format outlined in .env-example

2. Setup Database

Before running any further tests or files we need to run our setup-dbs script in order to setup our databases.

NOTE: This step assumes you have PostgreSQL setup correctly
https://www.postgresql.org/

```
npm run setup-dbs
```
