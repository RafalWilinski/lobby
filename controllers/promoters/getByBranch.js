const Promoter = require("../../models/").Promoter;
const config = require("../../config");

const getByBranch = async ctx => {
  try {
    const promoters = await Promoter.findAll();

    ctx.body = {
      promoters
    };
  } catch (err) {    
    throw {
      statusCode: 400,
      message: "Nie udało się pobrać listy promotorów",
      err
    };
  }
};

module.exports = getByBranch;
