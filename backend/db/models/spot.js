'use strict';
const {
  Model, INTEGER
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
        foreignKey: 'spotId', onDelete: 'CASCADE', hooks: 'true'
      }), //remove this?
        Spot.belongsTo(models.User, {
          foreignKey: "ownerId"
        }),
        Spot.hasMany(models.SpotImage, {
          foreignKey: 'spotId', onDelete: 'CASCADE', hooks: 'true'
        }),
        Spot.hasMany(models.Review, {
          foreignKey: 'spotId', onDelete: 'CASCADE', hooks: 'true'
        })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'cascade'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
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
    // avgRating: {
    //   type: DataTypes.INTEGER,
    //   validate: {
    //     min: 0, max: 5
    //   }
    // },
    // previewImage: {
    //   type: DataTypes.STRING
    // }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};