'use strict';
module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define('Skill', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Skill;
};