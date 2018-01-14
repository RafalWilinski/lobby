const Application = require("../../models/").Application;
const config = require("../../config");

const remove = async ctx => {
  const data = await Application.destroy({
    where: {
      roleId: ctx.params.roleId,
      login: ctx.params.login
    }
  });

  ctx.body = {
    data
  };
};

module.exports = remove;
