const UserBranch = require("../../models/").UserBranch;
const Branch = require("../../models/").Branch;

const get = async ctx => {
  try {
    const data = await UserBranch.findAll({
      where: {
        userLogin: ctx.request.query.userLogin
      }
    });

    ctx.body = {
      data
    };
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Nie udało się pobrać zainteresowań użytkownika",
      err
    };
  }
};

module.exports = get;