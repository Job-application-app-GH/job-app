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
    console.log('REQ USER IN USER DETAILS', req.user)
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
    // console.log('details:', details)
    res.send(details)
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
    console.log('update', updatedProfile[1].dataValues)
    res.send(updatedProfile[1].dataValues)
  } catch (error) {
    next(error)
  }
})

module.exports = router
