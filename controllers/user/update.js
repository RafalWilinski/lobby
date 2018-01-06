const User = require("../../models/").User;

const update = async ctx => {
  try {
    const user = await User.update(ctx.request.body.user,
      { where: { login: ctx.request.body.user.login }}
    );

    ctx.body = {
      user: ctx.request.body.user
    };
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Nie udało się zaktualizować danych użytkownika"
    };
  }
};

module.exports = update;