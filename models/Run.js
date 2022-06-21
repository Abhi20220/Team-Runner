const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Run extends Model {}

Run.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'run',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'run',
  }
)

module.exports = Run
