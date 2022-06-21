const router = require('express').Router()
const userRoutes = require('./userRoutes')
const runRoutes = require('./runRoutes')
const teamRoutes = require('./teamRoutes')

router.use('/users', userRoutes)
router.use('/runs', runRoutes)
router.use('/teams', teamRoutes)

module.exports = router