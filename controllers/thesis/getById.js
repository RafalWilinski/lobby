const Thesis = require("../../models/").Thesis;
const User = require("../../models/").User;
const Role = require("../../models/").Role;
const RoleSkill = require("../../models/").RoleSkill;
const config = require("../../config");

const get = async ctx => {
  const data = await Thesis.findOne({
    include: [
      {
        model: Role,
        include: [RoleSkill, User]
      }
    ],
    where: {
      id: ctx.params.id
    }
  });

  ctx.body = {
    data
  };
};

module.exports = get;
