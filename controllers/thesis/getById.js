const Thesis = require("../../models/").Thesis;
const User = require("../../models/").User;
const Role = require("../../models/").Role;
const RoleSkill = require("../../models/").RoleSkill;
const PromoterThesis = require("../../models/").PromoterThesis;
const Promoter = require("../../models/").Promoter;
const config = require("../../config");

const get = async ctx => {
  const data = await Thesis.findOne({
    include: [
      {
        model: Role,
        include: [RoleSkill, User]
      },
	  {
        model: PromoterThesis,
		include: [Promoter]
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
