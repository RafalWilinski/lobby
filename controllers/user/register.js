const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/").User;
const UserBranch = require("../../models/").UserBranch;
const UserSkill = require("../../models/").UserSkill;
const config = require("../../config");

const register = async ctx => {
  const hashedPassword = await bcrypt.hash(ctx.request.body.user.password, 10);

  try {
    const user = await User.create({
      ...ctx.request.body.user,
      password: hashedPassword
    });

    await Promise.all(
      ctx.request.body.user.branches.map(branch =>
        UserBranch.create({
          userLogin: ctx.request.body.user.login,
          branchName: branch
        })
      )
    );

    const userSkills = await Promise.all(
      ctx.request.body.userSkills.map(async userSkill => {
        const userSkillObj = await UserSkill.create({
          ...userSkill
        });
      })
    );

    const token = jwt.sign(user.login, config("jwtSecret"));

    ctx.body = {
      user,
      userSkills,
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
