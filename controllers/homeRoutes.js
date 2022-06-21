const router = require('express').Router()
const { Run, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    // Get all run data and JOIN with user data
    const runData = await Run.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })

    // Serialize data so the template can read it
    const runs = runData.map((Run) => Run.get({ plain: true }))

    // Pass serialized data and session flag into template
    res.render('homepage', {
        runs,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/run/:id', async (req, res) => {
  try {
    const runData = await Run.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })

    const Run = runData.get({ plain: true })

    res.render('Run', {
      ...Run,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Run }],
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
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }

  res.render('login')
})

module.exports = router
