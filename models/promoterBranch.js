"use strict";
module.exports = (sequelize, DataTypes) => {
  const PromoterBranch = sequelize.define("PromoterBranch", {
    firstName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    lastName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
	branchName: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  return PromoterBranch;
};
