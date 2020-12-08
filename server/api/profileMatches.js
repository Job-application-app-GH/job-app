const router = require('express').Router()
const {Match, Candidate, Job} = require('../db/models')

router.get('/:jobId', async (req, res, next) => {
  try {
    console.log('JOB ID->', req.params.jobId)
    let matches = await Match.findAll({
      where: {
        jobId: req.params.jobId,
        isMatch: 'MATCHED',
      },
      include: {
        model: Candidate,
      },
    })
    console.log('MATCHES--->', matches)
    res.send(matches)
  } catch (error) {
    next(error)
  }
})

module.exports = router
