const Thesis = require("../../models/").Thesis;
const Role = require("../../models/").Role;
const config = require("../../config");

const create = async ctx => {
  try {
    const thesis = await Thesis.create({
      ...ctx.request.body.thesis,
      numberOfRoles: ctx.request.body.roles.length
    });

    const roles = await Promise.all(
      ctx.request.body.roles.forEach(async role =>
        Role.create({
          ...role,
          thesisId: thesis.dataValues.id,
          capitan: false
        })
      )
    );

    console.log(thesis, roles);

    ctx.body = {
      thesis,
      roles
    };
  } catch (err) {
    console.log(err);

    throw {
      statusCode: 400,
      message: "Nie udało się utworzyć tematu",
      err
    };
  }
};

module.exports = create;
