const Thesis = require("../../models/").Thesis;
const ThesisBranch = require("../../models/").Application;
const Role = require("../../models/").Role;
const config = require("../../config");

const apply = async ctx => {
  try {
    const application = await Application.create({
      roleId: ctx.request.body.roleId,
      login: ctx.request.body.login,
      description: ctx.request.body.description,
      status: "APPLIED"
    });

    ctx.body = {
      application
    };
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Nie udało się zaaplikować do tematu",
      err
    };
  }
};

module.exports = apply;
