const router = require('express').Router()
const { Team } = require('../../models')
const withAuth = require('../../utils/auth')

//Creates a Team
router.post('/', withAuth, async (req, res) => {
    try {
        const newTeam = await Team.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newTeam)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Gets a team
router.get('/:id', async (req, res) => {
    try {
        const teamData = await Team.findByPk(req.params.id);
        if (!teamData) {
            res.status(404).json({ message: 'no Team with this id!'});
            return;
        }
        res.status(200).json(teamData);
    } catch (err) {
        res.status(500).json(err)
    }
});

//GETS all teams
router.get('/', async (req, res) => {
    try {
        const teamData = await Team.findByPk(req.params.id);
        if (!teamData) {
            res.status(404).json({ message: 'There are no teams created yet!'});
            return;
        }
        res.status(200).json(teamData);
    } catch (err) {
        res.status(500).json(err)
    }
});
// Updates a team

router.put('/:id', async (req, res) => {
    const updatedTeam =  await Team.update (
        {
            id: req.body.id,
            team_title: req.body.team_title,
            total_distance: req.body.total_distance,
            user_id: req.body.user_id,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    res.json(updatedTeam);
});

//Deletes a Team
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const teamData = await Team.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })

        if (!teamData) {
            res.status(404).json({message: 'No Team!'})
            return

        }
        res.status(200).json(teamData)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router 