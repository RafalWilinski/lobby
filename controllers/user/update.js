const User = require("../../models/").User;
const UserBranch = require("../../models/").UserBranch;
const UserSkill = require("../../models/").UserSkill;

const update = async ctx => {
  try {
    const user = await User.update(ctx.request.body.user,
      { where: { login: ctx.request.body.user.login }}
    );

    await UserBranch.destroy({ where: { userLogin: ctx.request.body.user.login } });
    await UserSkill.destroy({ where: { userLogin: ctx.request.body.user.login } });

    await Promise.all(
      ctx.request.body.user.branches.map(branch =>
        UserBranch.create({
          userLogin: ctx.request.body.user.login,
          branchName: branch
        })
      )
    );

    await Promise.all(
      ctx.request.body.user.skills.map(skill =>
        UserSkill.create({
          userLogin: ctx.request.body.user.login,
          skillName: skill.skillName,
          priority: skill.priority
        })
      )
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