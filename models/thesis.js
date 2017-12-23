"use strict";
module.exports = (sequelize, DataTypes) => {
  const Thesis = sequelize.define("Thesis", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    numberOfRoles: DataTypes.INTEGER
  });

  return Thesis;
};
