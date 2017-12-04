# Lobby

Engineering thesis - online system for matching students with topics.

### Prerequisites

* Node 8
* Docker

### Tech stack

* Node.js (runtime)
* Next.js + React (frontend)
* Koa (backend)
* PostgreSQL (database)
* Sequelize (ORM)
* JWT (Authentication)

### Setup

To install necessary dependencies:

```bash
npm install
```

### Development

```bash
npm run dev
```

This command will start both Dockerized Postgres container and Koa based
webserver (both frontend and backend).

### Creating new models

This consists of two parts:

1. Defining ORM model
2. Creating seeds (example data)

#### Defining ORM model

First, run command:

```bash
node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

Of course replace values with attributes of your choice.

This will do following:

* Create a model file in models folder
* Create a migration file with name like XXXXXXXXXXXXXX-create-yourModel.js in
  migrations folder

Then head to `models/<yourModelName.js>` and tweak it. Add constraints, keys,
indexes etc.

[More info here](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)

#### Creating example data

```bash
node_modules/.bin/sequelize seed:generate --name demo-user
```

This command will create a seed file in seeders folder. File name will look
something like XXXXXXXXXXXXXX-demo-user.js, It follows same up / down semantics
like migration files.

To apply seeds:

```bash
node_modules/.bin/sequelize db:seed:all
```

## Deployment

Deployments are performed automatically with each and every push to master
branch.

Still, you can (but shouldn't) perform them manually with following command:

```bash
now -e DB_PASSWORD=@db_password -t <ZEIT_TOKEN> --public
```
