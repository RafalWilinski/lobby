const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/").User;
const config = require("../../config");

const register = async ctx => {
  const hashedPassword = await bcrypt.hash(ctx.request.body.password, 10);

  try {
    const user = await User.create({
      email: ctx.request.body.email,
      password: hashedPassword
    });

    const token = jwt.sign(user.id, config("jwtSecret"));

    ctx.body = {
      user,
      token
    };
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Uzytkownik z danym mailem juz istnieje!"
    };
  }
};

module.exports = register;
