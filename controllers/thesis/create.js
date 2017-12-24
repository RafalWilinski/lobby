const Thesis = require("../../models/").Thesis;
const Role = require("../../models/").Role;
const config = require("../../config");

const create = async ctx => {
  try {
    const thesis = await Thesis.create(ctx.request.body.thesis);

    const roles = await Promise.all(
      ctx.request.body.roles.forEach(async role =>
        Role.create({
          ...role,
          thesisId: thesis.id
        })
      )
    );

    ctx.body = {
      thesis,
      roles
    };
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Nie udało się utworzyć tematu",
      err
    };
  }
};

module.exports = create;
