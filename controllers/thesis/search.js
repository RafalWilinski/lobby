const Thesis = require("../../models/").Thesis;
const ThesisBranch = require("../../models/").ThesisBranch;
const Role = require("../../models/").Role;
const RoleSkill = require("../../models/").RoleSkill;
const config = require("../../config");
const Op = require('sequelize').Op;

const get = async ctx => {
  const skills = ctx.request.query.branches ? ctx.request.query.branches.split(',') : []
  const data = await Thesis.findAll({
    include: [
      {
        model: Role,
        include: [{
          model: RoleSkill,
        }]
      }, {
        model: ThesisBranch
      }
    ],
    where: {
      [Op.or]: {
        name: {
          [Op.iLike]: `%${ctx.request.query.query}%`
        },
        description: {
          [Op.iLike]: `%${ctx.request.query.query}%`
        }
      }
    }
  });

  ctx.body = {
    data
  };
};

module.exports = get;
