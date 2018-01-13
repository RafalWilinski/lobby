"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    description: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  });

  User.associate = models => {
    User.Applications = User.hasMany(models.Application, {
      foreignKey: "login"
    });
    
    User.UserBranch = User.hasMany(models.UserBranch, {
      foreignKey: "userLogin"
    });
    
    User.UserSkill = User.hasMany(models.UserSkill, {
      foreignKey: "userLogin"
    });
  };

  return User;
};
