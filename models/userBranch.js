"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserBranch = sequelize.define("UserBranch", {
    userLogin: DataTypes.STRING,
    branchName: DataTypes.STRING
  });

  return UserBranch;
};
