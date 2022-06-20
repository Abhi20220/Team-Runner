const router = require('express').Router()
const { Team, Run } = require('../../models')
const withAuth = require('../../utils/auth')

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

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const teamData = await Run.destroy({
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
