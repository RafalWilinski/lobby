"use strict";
module.exports = (sequelize, DataTypes) => {
  const Promoter = sequelize.define("Promoter", {
    /*id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },*/
    firstName: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	lastName: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	degree: DataTypes.STRING
  });

  return Promoter;
};
