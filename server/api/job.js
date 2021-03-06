const router = require('express').Router()
const {Job} = require('../db/models')

//mounted on /api/job

router.get('/:id', async (req, res, next) => {
  try {
    let job = await Job.findByPk(req.params.id)
    res.send(job)
  } catch (error) {
    next(error)
  }
})

//making edit to this route
router.get('/allJobs/:orgId', async (req, res, next) => {
  try {
    let allJobs = await Job.findAll({
      where: {
        organizationId: req.params.orgId,
      },
    })
    res.send(allJobs)
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
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

router.put('/:id', async (req, res, next) => {
  try {
    let job = await Job.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
      plain: true,
    })
    res.send(job[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Job.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
