"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserBranch = sequelize.define("UserBranch", {
    userLogin: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    branchName: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  UserBranch.associate = models => {
    UserBranch.User = UserBranch.belongsTo(models.User, {
      foreignKey: "userLogin"
    });
  };

  return UserBranch;
};
