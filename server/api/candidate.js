const router = require('express').Router()
const {Candidate} = require('../db/models')

// mounted on api/candidate

router.get('/', async (req, res, next) => {
  try {
    console.log('USER ID', req.user.id)
    let candidate = await Candidate.findOne({
      where: {
        userId: req.user.id,
      },
    })
    console.log('candidate---->', candidate)
    res.send(candidate)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // console.log('REQ BODY in candidate--->', req.body)
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
