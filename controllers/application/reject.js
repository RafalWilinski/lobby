const Thesis = require("../../models/").Thesis;
const Application = require("../../models/").Application;
const Role = require("../../models/").Role;
const config = require("../../config");

const reject = async ctx => {
  try {
    ctx.body = {};
  } catch (err) {
    console.log(err);

    throw {
      statusCode: 400,
      message: "Nie udało się odrzucić aplikanta",
      err
    };
  }
};

module.exports = reject;
