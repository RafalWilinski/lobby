const Thesis = require("../../models/").Thesis;
const Role = require("../../models/").Role;
const config = require("../../config");

const get = async ctx => {
  const data = await Role.findAll({
    include: [
      {
        model: Thesis
      }
    ],
    where: {
      userLogin: ctx.request.query.userLogin
    }
  });

  ctx.body = {
    data
  };
};

module.exports = get;
