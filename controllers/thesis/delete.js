const Thesis = require("../../models/").Thesis;
const Role = require("../../models/").Role;
const config = require("../../config");

const remove = async ctx => {
  const data = await Thesis.destroy({
    where: {
      id: ctx.params.id
    }
  });

  ctx.body = {
    data
  };
};

module.exports = remove;
