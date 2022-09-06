# NC Backend Project

## Set Up Instructions

1. Install dependencies

Run

```
npm install
```

2. Set Up Environment Variables.

In order to connect to the database that setup.sql will create ( you can find this file in ~/db/setup.sql ) we will need to create .env files that follow the ~/.env-example format of:

```
PGDATABASE=database_name_here
```

for both the test and development databases.

In the project root directory create the following .env files

```
.env.development
.env.test
```

Each of these .env files should contain the database names outlined in ~/db/setup.sql
These are currently labelled as

```
nc_games
```

and

```
nc_games_test
```

But could be changed to any name you like.

The resulting .env files should then be

- .env.development

containing:

```
PGDATABASE=nc_games
```

and

- .env.test containing:

```
PGDATABASE=nc_games_test
```

3. Setup Database

Before running any further tests or files we need to run our setup-dbs script in order to setup our databases.

NOTE: This step assumes you have PostgreSQL setup correctly
https://www.postgresql.org/

```
npm run setup-dbs
```

