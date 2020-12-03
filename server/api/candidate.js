const router = require('express').Router()
const {Candidate} = require('../db/models')

// mounted on api/candidate

router.post('/', async (req, res, next) => {
  try {
    console.log('REQ BODY--->', req.body)
    let {currentCompany, currentRole, description} = req.body
    let newCandidate = await Candidate.create({
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
