const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/").User;
const UserBranch = require("../../models/").UserBranch;
const config = require("../../config");

const register = async ctx => {
  const hashedPassword = await bcrypt.hash(ctx.request.body.user.password, 10);

  try {
    const user = await User.create({
      ...ctx.request.body.user,
      password: hashedPassword,
    });
    const userbranch = await UserBranch.create({
      ...ctx.request.body.userbranch
    });

    const token = jwt.sign(user.login, config("jwtSecret"));

    ctx.body = {
      user,
      userbranch,
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
