const Skill = require("../../models/").Skill;
const config = require("../../config");

const getAll = async ctx => {
  try {
    const skills = await Skill.findAll();

    ctx.body = {
      skills
    };
  } catch (err) {    
    throw {
      statusCode: 400,
      message: "Nie udało się pobrać listy umiejętności",
      err
    };
  }
};

module.exports = getAll;
