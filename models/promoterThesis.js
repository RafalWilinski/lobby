"use strict";
module.exports = (sequelize, DataTypes) => {
  const PromoterThesis = sequelize.define("PromoterThesis", {
    firstName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    lastName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
	thesisId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });

  return PromoterThesis;
};
