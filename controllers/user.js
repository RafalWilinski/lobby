const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/").User;
const config = require("../config");

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

const login = async ctx => {
  const user = await User.findOne({
    where: {
      email: ctx.request.body.email
    }
  });

  if (user) {
    const isCorrectPassword = await bcrypt.compare(
      ctx.request.body.password,
      user.password
    );

    if (isCorrectPassword) {
      const token = jwt.sign(user.id, config("jwtSecret"));
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

const getUserById = id => User.findById(id);

module.exports = {
  register,
  login,
  getUserById
};
