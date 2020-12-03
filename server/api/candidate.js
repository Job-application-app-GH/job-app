const router = require('express').Router()
const {Candidate} = require('../db/models')

// mounted on api/candidate

router.post('/', async (req, res, next) => {
  try {
    console.log('REQ BODY in candidate--->', req.body)
    let {name, location, currentCompany, currentRole, description} = req.body
    let newCandidate = await Candidate.create({
      name: name,
      location: location,
      currentCompany: currentCompany,
      currentRole: currentRole,
      description: description,
      userId: req.user.id,
    })
    res.status(201).send(newCandidate)
  } catch (error) {
    next(error)
  }
})

module.exports = router
