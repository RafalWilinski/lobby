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

  return ThesisBranch;
};
