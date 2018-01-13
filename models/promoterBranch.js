"use strict";
module.exports = (sequelize, DataTypes) => {
  const PromoterBranch = sequelize.define("PromoterBranch", {
    promoterId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
	branchName: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  return PromoterBranch;
};
