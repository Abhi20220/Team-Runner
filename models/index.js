const Player = require('./Player');
const Team = require('./Team');

Team.hasMany(Player, {

});

Player.belongsTo(Team, {

});

module.exports = { Player, Team };