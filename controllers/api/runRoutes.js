const router = require('express').Router()
const { Run } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
  try {
    const newRun = await Run.create({
      ...req.body,
      user_id: req.session.user_id,
    })

    res.status(200).json(newRun)
  } catch (err) {
    res.status(400).json(err)
  }
})

//gets one users data
router.get('/:id', async (req, res) => {
  try {
      const runData = await Run.findByPk(req.params.id);
      if (!runData) {
          res.status(404).json({ message: 'There is no run data for this user'});
          return;
      }
      res.status(200).json(runData);
  } catch (err) {
      res.status(500).json(err)
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const runData = await Run.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })

    if (!runData) {
      res.status(404).json({ message: 'No run!' })
      return
    }

    res.status(200).json(runData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

//delete
