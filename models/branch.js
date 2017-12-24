"use strict";
module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define("Branch", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  return Branch;
};
