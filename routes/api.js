const Router = require("koa-router");
const login = require("../controllers/user/login");
const register = require("../controllers/user/register");
const createThesis = require("../controllers/thesis/create");
const getSkills = require('../controllers/skills/getAll');

const API = new Router();

API.post("/login", login)
  .post("/register", register)
  .post("/thesis", createThesis)
  .get("/skills", getSkills);

module.exports = API;
