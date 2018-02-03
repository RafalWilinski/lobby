"use strict";
module.exports = (sequelize, DataTypes) => {
  const ThesisBranch = sequelize.define("ThesisBranch", {
    thesisId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    branchName: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  ThesisBranch.associate = models => {
    ThesisBranch.Thesis = ThesisBranch.belongsTo(models.Thesis, {
      foreignKey: "thesisId"
    });
  };

  return ThesisBranch;
};
