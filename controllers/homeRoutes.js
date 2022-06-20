const router = require('express').Router()
const { Players, User } = require('../controllers')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    const allPlayers = await Player.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })

    const posts = allPlayers.map((player) => player.get({ plain: true }))

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/players/:id', async (req, res) => {
  try {
    const allPlayers = await Players.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })

    const player = allPlayers.get({ plain: true })

    res.render('player', {
      ...player,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.player_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Players }],
    })

    const user = userData.get({ plain: true })

    res.render('profile', {
      ...user,
      logged_in: true,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }

  res.render('login')
})

module.exports = router
