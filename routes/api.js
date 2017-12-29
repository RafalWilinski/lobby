const Router = require("koa-router");

const login = require("../controllers/user/login");
const register = require("../controllers/user/register");

const createThesis = require("../controllers/thesis/create");
const getByUserLogin = require("../controllers/thesis/getByUserLogin");
const search = require('../controllers/thesis/search');

const getSkills = require("../controllers/skills/getAll");

const getBranches = require("../controllers/branches/getAll");

const API = new Router();

API.post("/login", login)
  .post("/register", register)
  .post("/thesis", createThesis)
  .get('/thesis/search', search)
  .get("/user/theses", getByUserLogin)
  .get("/skills", getSkills)
  .get("/branches", getBranches);

module.exports = API;
