"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define("UserSkill", {
    priority: DataTypes.INTEGER,
    userLogin: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    skillName: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  return UserSkill;
};
