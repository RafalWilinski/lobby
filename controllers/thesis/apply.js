const Thesis = require("../../models/").Thesis;
const Application = require("../../models/").Application;
const Role = require("../../models/").Role;
const config = require("../../config");

const apply = async ctx => {
  try {
    const application = await Application.create({
      roleId: ctx.request.body.roleId,
      login: ctx.request.body.login,
      description: ctx.request.body.description,
      status: "Zaaplikował"
    });

    ctx.body = {
      application
    };
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      throw {
        statusCode: 400,
        message: "Nie mozesz aplikować drugi raz na ten sam temat!",
        err
      };
    }

    throw {
      statusCode: 400,
      message: "Nie udało się zaaplikować do tematu",
      err
    };
  }
};

module.exports = apply;
