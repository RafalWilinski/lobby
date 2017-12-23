"use strict";
module.exports = (sequelize, DataTypes) => {
  const Promoter = sequelize.define("Promoter", {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    numberOfRoles: DataTypes.INTEGER
  });

  return Promoter;
};
