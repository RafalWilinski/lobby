const Thesis = require("../../models/").Thesis;
const Application = require("../../models/").Application;
const Role = require("../../models/").Role;
const config = require("../../config");

const accept = async ctx => {
  try {
    ctx.body = {};
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Nie udało się zaakceptować aplikanta",
      err
    };
  }
};

module.exports = accept;
