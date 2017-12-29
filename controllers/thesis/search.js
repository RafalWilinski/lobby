const Thesis = require("../../models/").Thesis;
const config = require("../../config");
const Op = require('sequelize').Op;

const get = async ctx => {
  const data = await Thesis.findAll({
    where: {
      numberOfRoles: {
        [Op.between]: [ctx.request.query.minRoles, ctx.request.query.maxRoles]
      },
      name: {
        [Op.like]: ctx.request.query.name,
      },
      description: {
        [Op.like]: ctx.request.query.description,
      }
    }
  });

  ctx.body = {
    data
  };
};

module.exports = get;
