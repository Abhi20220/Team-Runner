const router = require('express').Router()
const { User, Team, Run } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }

  res.render('dashboard')
})

router.get('/Team/:id', async (req, res) => {
  try {
    const dataTeam = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })

    const Team = dataTeam.get({ plain: true })

    res.render('Team', {
      ...Team,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Team }],
    })

    const newUser = userData.get({ plain: true })

    res.render('profile', {
      ...newUser,
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

//delete
