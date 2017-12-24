"use strict";
module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define("Skill", {
    name: DataTypes.STRING
  });

  return Skill;
};
