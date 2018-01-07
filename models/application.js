"use strict";
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define("Application", {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  Application.associate = models => {
    Application.Role = Application.belongsTo(models.Role, {
      foreignKey: "roleId"
    });

    Application.User = Application.belongsTo(models.User, {
      foreignKey: "login"
    });
  };

  return Application;
};
