"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserBranch = sequelize.define("UserBranch", {
    userLogin: DataType.STRING,
    branchName: DataType.STRING,
  });

  return UserBranch;
};
