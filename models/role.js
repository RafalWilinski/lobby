"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: DataTypes.STRING,
    userLogin: DataTypes.STRING,
    description: DataTypes.STRING,
    capitan: DataTypes.BOOLEAN,
    thesisId: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    numberOfRoles: DataTypes.INTEGER
  });

  return Role;
};
