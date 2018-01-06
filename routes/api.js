const Router = require("koa-router");

const login = require("../controllers/user/login");
const register = require("../controllers/user/register");
const profileUpdate = require("../controllers/user/profileUpdate");

const createThesis = require("../controllers/thesis/create");
const getThesisByUserLogin = require("../controllers/thesis/getByUserLogin");
const getThesisById = require("../controllers/thesis/getById");
const search = require("../controllers/thesis/search");

const getSkills = require("../controllers/skills/getAll");

const getBranches = require("../controllers/branches/getAll");

const API = new Router();

API.post("/login", login)
  .post("/register", register)
  .post("/profileUpdate", profileUpdate)
  .post("/thesis", createThesis)
  .get("/thesis/:id", getThesisById)
  .get("/thesis/search", search)
  .get("/user/theses", getThesisByUserLogin)
  .get("/skills", getSkills)
  .get("/branches", getBranches);

module.exports = API;
