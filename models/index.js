const User = require('./User')
const Team = require('./Team')
const Run = require('./Run')

User.hasMany(Run, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Run.belongsTo(User, {
  foreignKey: 'user_id',
})

User.belongsTo(Team, {
  foreignKey: 'user_id',
})

Run.belongsTo(Team, {
  foreignKey: 'team_id',
})

Team.hasMany(User, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
})

Team.hasMany(Run, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
})

module.exports = { User, Team, Run }
