"use strict";
module.exports = (sequelize, DataTypes) => {
  const Thesis = sequelize.define("Thesis", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    numberOfRoles: DataTypes.INTEGER
    // isPublic: DataTypes.BOOLEAN
  });

  Thesis.associate = models => {
    Thesis.Roles = Thesis.hasMany(models.Role, {
      foreignKey: "thesisId"
    });
  };

  return Thesis;
};
