'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PreviewImage.belongsTo(models.Spot,{
        foreignKey: 'spotId'
      })
    }
  }
  PreviewImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'PreviewImage',
  });
  return PreviewImage;
};