const Router = require("koa-router");

const login = require("../controllers/user/login");
const register = require("../controllers/user/register");
const createThesis = require("../controllers/thesis/create");
const getSkills = require("../controllers/skills/getAll");
const getBranches = require("../controllers/branches/getAll");

const API = new Router();

API.post("/login", login)
  .post("/register", register)
  .post("/thesis", createThesis)
  .get("/skills", getSkills)
  .get("/branches", getBranches);

module.exports = API;
