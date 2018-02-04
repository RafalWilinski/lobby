const Thesis = require("../../models/").Thesis;
const Application = require("../../models/").Application;
const Role = require("../../models/").Role;
const User = require("../../models/").User;
const config = require("../../config");

const accept = async ctx => {
  try {
    const data = await Application.update(
      {
        status: "Zaakceptowany"
      },
      {
        where: {
          roleId: ctx.params.roleId,
          login: ctx.params.login
        }
      }
    );

    const userData = await User.update({
      roleId: ctx.params.roleId
    }, { where: {
      login: ctx.params.login
    }})

    const roleData = await Role.update({
      userLogin: ctx.params.login
    }, { where: {
      id: ctx.params.roleId
    }});

    ctx.body = {
      data,
      userData,
      roleData
    };
  } catch (err) {
    console.log(err);
    throw {
      statusCode: 400,
      message: "Nie udało się zaakceptować aplikanta",
      err
    };
  }
};

module.exports = accept;
