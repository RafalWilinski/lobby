"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: DataTypes.STRING,
    userLogin: DataTypes.STRING,
    description: DataTypes.STRING,
    capitan: DataTypes.BOOLEAN,
    thesisId: DataTypes.INTEGER
  });

  Role.associate = models => {
    Role.Thesis = Role.belongsTo(models.Thesis, {
      foreignKey: "thesisId"
    });

    Role.User = Role.belongsTo(models.User, {
      foreignKey: "userLogin"
    });

    Role.Skills = Role.hasMany(models.RoleSkill, {
      foreignKey: "roleId"
    });
  };

  return Role;
};
