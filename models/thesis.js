"use strict";
module.exports = (sequelize, DataTypes) => {
  const Thesis = sequelize.define("Thesis", {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    numberOfRoles: DataTypes.INTEGER
  });

  return Thesis;
};
