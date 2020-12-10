const router = require('express').Router()
const {Match, Candidate, Job, Organization} = require('../db/models')

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
        include: [
          {
            model: Organization,
          },
        ],
      },
    })
    console.log('MATCHES--->', matches)
    res.send([matches])
  } catch (error) {
    next(error)
  }
})

router.get('/user/:candidateId', async (req, res, next) => {
  try {
    console.log('Candidate ID->', req.params.candidateId)
    let matches = await Match.findAll({
      where: {
        candidateId: req.params.candidateId,
        isMatch: 'MATCHED',
      },
      include: {
        model: Job,
      },
    })
    console.log('MATCHES--->', matches)
    res.send(matches)
  } catch (error) {
    next(error)
  }
})

module.exports = router
