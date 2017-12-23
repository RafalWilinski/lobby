"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define("UserSkill", {
    priority: DataTypes.INTEGER,
    userLogin: DataTypes.STRING,
    skillName: DataTypes.STRING
  });

  return UserSkill;
};
