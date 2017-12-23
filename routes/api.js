const Router = require("koa-router");
const login = require("../controllers/user/login");
const register = require("../controllers/user/register");

const API = new Router();

API.post("/login", login).post("/register", register);

module.exports = API;
