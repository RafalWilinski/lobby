"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  });

  User.associate = models => {
    User.Role = User.hasOne(models.Role, {
      foreignKey: "id",
      sourceKey: "roleId"
    });
  };

  return User;
};
