const Thesis = require("../../models/").Thesis;
const ThesisBranch = require("../../models/").ThesisBranch;
const Role = require("../../models/").Role;
const RoleSkill = require("../../models/").RoleSkill;
const config = require("../../config");
const Op = require('sequelize').Op;

const get = async ctx => {
  const branches = ctx.request.query.branches ? { branchName: { [Op.in]: ctx.request.query.branches.split(',') } } : {},
    skills = ctx.request.query.skills ? { skillName: { [Op.in]: ctx.request.query.skills.split(',') } } : {},
    query = ctx.request.query.query ? `%${ctx.request.query.query}%` : '%',
    available = ctx.request.query.available ? { userLogin: null } : {};

  const data = await Thesis.findAll({
    include: [
      {
        model: Role,
        where: available,
        include: [{
          model: RoleSkill,
          where: skills
        }]
      }, {
        model: ThesisBranch,
        where: branches
      }
    ],
    where: {
      [Op.or]: {
        name: {
          [Op.iLike]: query
        },
        description: {
          [Op.iLike]: query
        }
      }
    }
  });

  ctx.body = {
    data
  };
};

module.exports = get;
