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
    jwtSecret: "deadbeef",
    pool: {
      max: 100
    }
  },
  production: {
    username: "lobby",
    password: process.env.DB_PASSWORD,
    database: "lobby",
    host: "lobby.ctzgljusbdm4.us-east-1.rds.amazonaws.com",
    dialect: "postgres",
    jwtSecret: "deadbeef",
    pool: {
      max: 100
    }
  }
};
