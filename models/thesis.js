"use strict";
module.exports = (sequelize, DataTypes) => {
  const Thesis = sequelize.define("Thesis", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    numberOfRoles: DataTypes.INTEGER,
    ispublic: DataTypes.BOOLEAN
  });

  Thesis.associate = models => {
    Thesis.Roles = Thesis.hasMany(models.Role, {
      foreignKey: "thesisId"
    });

    Thesis.Branches = Thesis.hasMany(models.ThesisBranch, {
      foreignKey: "thesisId"
    });

	Thesis.Promoters = Thesis.hasOne(models.PromoterThesis, {
      foreignKey: "thesisId"
    });
  };

  return Thesis;
};
