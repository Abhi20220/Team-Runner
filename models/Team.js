const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    team_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_distance: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'team',
  }
)

module.exports = Team
