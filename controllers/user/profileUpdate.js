const User = require("../../models/").User;

const profileUpdate = async ctx => {
  try {
    const user = await User.update(ctx.request.body.user,
      { where: { login: '???' }}
    );
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Nie udało się zaktualizować danych użytkownika"
    };
  }
};

module.exports = profileUpdate;