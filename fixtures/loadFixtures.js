const fixtures = require("sequelize-fixtures");
const models = require("../models");

fixtures.loadFile("./fixtures/*.yml", models).then(() => process.exit());
