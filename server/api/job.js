const router = require('express').Router()
const {Job} = require('../db/models')

//mounted on /api/job

router.post('/:id', async (req, res, next) => {
  try {
    console.log('REQ BODY JOB API', req.params)
    let {title, description, location, isRemote} = req.body
    let newJob = await Job.create({
      title: title,
      description: description,
      location: location,
      isRemote: isRemote,
      organizationId: req.params.id,
    })
    res.status(201).send(newJob)
  } catch (error) {
    next(error)
  }
})

module.exports = router
