const Router = require("koa-router");
const UserController = require("../controllers/user");

const API = new Router();

API.post("/login", UserController.login)
  .post("/register", UserController.register)
  .get("/users/:id", UserController.getUserById);

module.exports = API;
