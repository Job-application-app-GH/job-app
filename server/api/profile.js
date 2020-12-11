const router = require('express').Router()
const {
  User,
  Candidate,
  Organization,
  Job,
  CandidateSkill,
} = require('../db/models')

// mounted on /api/profile

router.get('/', async (req, res, next) => {
  let details
  try {
    if (req.user.userType === 'CANDIDATE') {
      details = await Candidate.findOne({
        where: {
          userId: req.user.id,
        },
      })
    } else {
      details = await Organization.findOne({
        where: {
          userId: req.user.id,
        },
        include: {
          model: Job,
        },
      })
    }
    res.send(details)
  } catch (error) {
    next(error)
  }
})

router.get('/:candidateId', async (req, res, next) => {
  try {
    // let candidateProfile = await Candidate.findByPk(req.params.candidateId)
    let candidateProfile = await Candidate.findOne({
      where: {
        id: req.params.candidateId,
      },
      include: {
        model: User,
        attributes: ['email'],
      },
    })
    res.send(candidateProfile)
  } catch (error) {
    next(error)
  }
})

router.get('/job/:jobId', async (req, res, next) => {
  try {
    // let jobProfile = await Job.findByPk(req.params.jobId)
    let jobProfile = await Job.findOne({
      where: {
        id: req.params.jobId,
      },
      include: {
        model: Organization,
      },
    })
    res.send(jobProfile)
  } catch (error) {
    next(error)
  }
})

router.get('/skills', async (req, res, next) => {
  try {
    let candidate = await Candidate.findOne({
      where: {
        userId: req.user.id,
      },
    })
    let candidateSkills = await CandidateSkill.findAll({
      where: {
        candidateId: candidate.id,
      },
    })
    res.send(candidateSkills)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let updatedProfile
    if (req.user.userType === 'CANDIDATE') {
      updatedProfile = await Candidate.update(req.body, {
        where: {
          userId: req.user.id,
        },
        returning: true,
        plain: true,
      })
    } else {
      updatedProfile = await Organization.update(req.body, {
        where: {
          userId: req.user.id,
        },
        returning: true,
        plain: true,
      })
    }
    res.send(updatedProfile[1].dataValues)
  } catch (error) {
    next(error)
  }
})

module.exports = router
