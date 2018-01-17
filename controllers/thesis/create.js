const Thesis = require("../../models/").Thesis;
const ThesisBranch = require("../../models/").ThesisBranch;
const Role = require("../../models/").Role;
const RoleSkill = require("../../models/").RoleSkill;
const PromoterThesis = require("../../models/").PromoterThesis;
const config = require("../../config");

const create = async ctx => {
  try {
    const thesis = await Thesis.create({
      ...ctx.request.body.thesis,
      numberOfRoles: ctx.request.body.roles.length
    });

    const roles = await Promise.all(
      ctx.request.body.roles.map(async role => {
        const roleObj = await Role.create({
          ...role,
          thesisId: thesis.dataValues.id
        });

        return Promise.all(
          role.skills.map(skill =>
            RoleSkill.create({
              skillName: skill,
              roleId: roleObj.id
            })
          )
        );
      })
    );

    await Promise.all(
      ctx.request.body.thesis.branches.map(branch =>
        ThesisBranch.create({
          thesisId: thesis.id,
          branchName: branch
        })
      )
    );

    await PromoterThesis.create({
      ...ctx.request.body.promoterThesis,
      thesisId: thesis.dataValues.id
    });

    ctx.body = {
      thesis,
      roles,
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
