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
    username: "uqxhoopnryjuzs",
    password: process.env.DB_PASSWORD,
    database: "d6s4o4522dokm5",
    host: "ec2-54-75-226-64.eu-west-1.compute.amazonaws.com",
    dialect: "postgres",
    jwtSecret: "deadbeef"
  }
};
