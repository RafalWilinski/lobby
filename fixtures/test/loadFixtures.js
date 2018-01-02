const fixtures = require("sequelize-fixtures");
const models = require("../../models");

fixtures.loadFile("./fixtures/test/*.yml", models).then(() => process.exit());
