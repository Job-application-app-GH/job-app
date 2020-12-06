
const router = require('express').Router()
const { Candidate, Organization, Job} = require('../db/models')



// ON /api/users

router.get('/', async (req, res, next) => {
  let details
  try {
    if (req.user.userType === 'CANDIDATE') {
      details = await Candidate.findAll({
        attributes: ['id', 'name', 'location', 'description', 'isRemote', 'currentRole', 'currentCompany'],
      })
    } else {
      details = await Organization.findAll({
        attributes: ['id', 'name', 'description', 'isRemote', 'location'],
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

module.exports = router