const UserSkill = require("../../models/").UserSkill;

const get = async ctx => {
  try {
    const data = await UserSkill.findAll({
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
      message: "Nie udało się pobrać umiejętności użytkownika",
      err
    };
  }
};

module.exports = get;