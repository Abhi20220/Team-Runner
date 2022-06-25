const sequelize = require('../config/connection');
const { Run, Team, User } = require('../models');

const userData = require ('./userData.json');
const teamData = require ('./teamData.json');
const runData = require ('./runData.json');
 
const seedDatabase = async () => {
    await sequelize.sync ({ force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true, 
    });

    for (const run of runData) {
        await Run.create ({
            ...run,
            user_id: users[Math.floor(Math.random() *
            users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();