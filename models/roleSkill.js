"use strict";
module.exports = (sequelize, DataTypes) => {
  const RoleSkill = sequelize.define("RoleSkill", {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    skillName: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  RoleSkill.associate = models => {
    RoleSkill.Role = RoleSkill.belongsTo(models.Role, {
      foreignKey: "roleId"
    });
  };

  return RoleSkill;
};
