const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/").user;
const config = require("../../config");

const login = async ctx => {
  const user = await User.findOne({
    where: {
      login: ctx.request.body.login
    }
  });

  if (user) {
    const isCorrectPassword = await bcrypt.compare(
      ctx.request.body.password,
      user.password
    );

    if (isCorrectPassword) {
      const token = jwt.sign(user.login, config("jwtSecret"));
      ctx.body = {
        user,
        token
      };
    } else {
      throw {
        statusCode: 400,
        message: "Niepoprawne hasło"
      };
    }
  } else {
    throw {
      statusCode: 404,
      message: "Uzytkownik nie znaleziony"
    };
  }
};

module.exports = login;
