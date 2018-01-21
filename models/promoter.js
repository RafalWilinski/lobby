"use strict";
module.exports = (sequelize, DataTypes) => {
  const Promoter = sequelize.define("Promoter", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    degree: DataTypes.STRING
  });

  return Promoter;
};
