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

  Thesis.associate = models => {
    Thesis.Roles = Thesis.hasMany(models.Role, {
      sourceKey: 'id',
      targetKey: 'thesisId'
    });

    
  };

  return Thesis;
};
