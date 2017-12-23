"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define("UserSkill", {
    priority: DataTypes.INTEGER,
    userLogin: DataType.STRING,
    skillName: DataType.STRING,
  });

  return UserSkill;
};
