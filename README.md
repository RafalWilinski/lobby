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

Before doing any calls please setup database with `db_en.sql` file.

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

## Deployment

Deployments are performed automatically with each and every push to master
branch.

Still, you can (but shouldn't) perform them manually with following command:

```bash
now -e DB_PASSWORD=@db_password -t <ZEIT_TOKEN> --public
```
