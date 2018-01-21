"use strict";
module.exports = (sequelize, DataTypes) => {
  const PromoterThesis = sequelize.define("PromoterThesis", {
    promoterId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    thesisId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });

  return PromoterThesis;
};
