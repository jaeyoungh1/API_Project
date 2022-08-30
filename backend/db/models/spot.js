'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      }), //remove this?
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId"
      }),
        Spot.hasMany(models.PreviewImage, {
        foreignKey: 'spotId'
      }),
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    avgRating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0, max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};