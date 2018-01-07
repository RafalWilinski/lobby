const Router = require("koa-router");

const login = require("../controllers/user/login");
const register = require("../controllers/user/register");
const updateUser = require("../controllers/user/update");

const createThesis = require("../controllers/thesis/create");
const getThesisByUserLogin = require("../controllers/thesis/getByUserLogin");
const getThesisById = require("../controllers/thesis/getById");
const deleteThesisById = require("../controllers/thesis/delete");
const search = require("../controllers/thesis/search");
const apply = require("../controllers/thesis/apply");

const accept = require("../controllers/application/accept");
const reject = require("../controllers/application/reject");
const getApplicationsByUserLogin = require("../controllers/application/getByUserLogin");

const getSkills = require("../controllers/skills/getAll");
const getBranches = require("../controllers/branches/getAll");

const API = new Router();

API.post("/login", login)
  .post("/register", register)
  .post("/user/update", updateUser)
  .post("/thesis/apply", apply)
  .post("/thesis", createThesis)
  .post("/application/:roleId/:login/accept")
  .post("/application/:roleId/:login/reject")
  .delete("/thesis/:id", deleteThesisById)
  .get("/thesis/:id", getThesisById)
  .get("/thesis/search", search)
  .get("/user/theses", getThesisByUserLogin)
  .get("/user/applications", getApplicationsByUserLogin)
  .get("/skills", getSkills)
  .get("/branches", getBranches);

module.exports = API;
