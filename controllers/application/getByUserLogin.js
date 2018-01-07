const Thesis = require("../../models/").Thesis;
const Role = require("../../models/").Role;
const Application = require("../../models/").Application;
const config = require("../../config");

const get = async ctx => {
  try {
    const data = await Application.findAll({
      include: [
        {
          model: Role,
          include: [Thesis]
        }
      ],
      where: {
        login: ctx.request.query.userLogin
      }
    });

    ctx.body = {
      data
    };
  } catch (err) {
    console.log(err);
    throw {
      statusCode: 400,
      message: "Nie udało się pobrać listy aplikacji",
      err
    };
  }
};

module.exports = get;
