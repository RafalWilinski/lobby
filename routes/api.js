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
const withdraw = require("../controllers/application/withdraw");
const getApplicationsByUserLogin = require("../controllers/application/getByUserLogin");
const getApplicationsByThesisId = require("../controllers/application/getByThesisId");

const getSkills = require("../controllers/skills/getAll");
const getSkillsUserLogin = require("../controllers/skills/getByUserLogin");

const getBranches = require("../controllers/branches/getAll");
const getBranchesByUserLogin = require("../controllers/branches/getByUserLogin");

const getPromoters = require("../controllers/promoters/getByBranch");

const API = new Router();

API.post("/login", login)
  .post("/register", register)
  .post("/user/update", updateUser)
  .post("/thesis/apply", apply)
  .post("/thesis", createThesis)
  .post("/application/:roleId/:login/accept", accept)
  .post("/application/:roleId/:login/reject", reject)
  .delete("/application/:roleId/:login/withdraw", withdraw)
  .delete("/thesis/:id", deleteThesisById)
  .get("/thesis/search", search)
  .get("/thesis/applications", getApplicationsByThesisId)
  .get("/thesis/:id", getThesisById)
  .get("/user/theses", getThesisByUserLogin)
  .get("/user/applications", getApplicationsByUserLogin)
  .get("/user/branches", getBranchesByUserLogin)
  .get("/user/skills", getSkillsUserLogin)
  .get("/skills", getSkills)
  .get("/branches", getBranches)
  .get("/promoters", getPromoters);

module.exports = API;
