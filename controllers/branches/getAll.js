const Branch = require("../../models/").Branch;
const config = require("../../config");

const getAll = async ctx => {
  try {
    const branches = await Branch.findAll();

    ctx.body = {
      branches
    };
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Nie udało się pobrać listy kategorii",
      err
    };
  }
};

module.exports = getAll;
