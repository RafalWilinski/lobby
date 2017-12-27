const Thesis = require("../../models/").Thesis;
const ThesisBranch = require("../../models/").ThesisBranch;
const Role = require("../../models/").Role;
const RoleSkill = require("../../models/").RoleSkill;
const config = require("../../config");

const create = async ctx => {
  try {
    const thesis = await Thesis.create({
      ...ctx.request.body.thesis,
      numberOfRoles: ctx.request.body.roles.length
    });

    const roles = await Promise.all(
      ctx.request.body.roles.map(role => {
        const roleObj = Role.create({
          ...role,
          thesisId: thesis.dataValues.id
        });

        return roleObj;
      })
    );

    const thesisBranches = await Promise.all(
      ctx.request.body.thesis.branches.map(branch =>
        ThesisBranch.create({
          thesisId: thesis.id,
          branchName: branch
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
