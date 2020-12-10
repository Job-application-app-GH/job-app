const router = require('express').Router()
const {Candidate} = require('../db/models')

// mounted on api/candidate

router.get('/', async (req, res, next) => {
  try {
    let candidate = await Candidate.findOne({
      where: {
        userId: req.user.id,
      },
    })
    res.send(candidate)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {
      name,
      location,
      currentCompany,
      currentRole,
      description,
      isRemote,
    } = req.body
    let newCandidate = await Candidate.create({
      name: name,
      location: location,
      currentCompany: currentCompany,
      currentRole: currentRole,
      description: description,
      userId: req.user.id,
      isRemote: isRemote,
    })
    res.status(201).send(newCandidate)
  } catch (error) {
    next(error)
  }
})

module.exports = router
