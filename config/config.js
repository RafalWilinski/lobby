module.exports = {
  development: {
    username: "lobby",
    password: null,
    database: "lobby",
    host: "127.0.0.1",
    dialect: "postgres",
    jwtSecret: "deadbeef"
  },
  test: {
    username: "lobby",
    password: null,
    database: "lobby",
    host: "127.0.0.1",
    dialect: "postgres",
    jwtSecret: "deadbeef"
  },
  production: {
    username: "jztvkilo",
    password: process.env.DB_PASSWORD,
    database: "jztvkilo",
    host: "baasu.db.elephantsql.com",
    dialect: "postgres",
    jwtSecret: "deadbeef"
  }
};
