const Thesis = require("../../models/").Thesis;
const Application = require("../../models/").Application;
const Role = require("../../models/").Role;
const config = require("../../config");

const reject = async ctx => {
  try {
    const data = await Application.update(
      {
        status: "Odrzucony"
      },
      {
        where: {
          roleId: ctx.params.roleId,
          login: ctx.params.login
        }
      }
    );

    ctx.body = {
      data
    }
  } catch (err) {
    console.log(err);

    throw {
      statusCode: 400,
      message: "Nie udało się odrzucić aplikanta",
      err
    };
  }
};

module.exports = reject;
