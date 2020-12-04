const router = require('express').Router()
const {Organization} = require('../db/models')

//mounted on api/organization

router.get('/', async (req, res, next) => {
  try {
    let selectedOrg = await Organization.findOne({
      where: {
        userId: req.user.id,
      },
    })
    res.send(selectedOrg)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {name, description, location, isRemote} = req.body
    let newOrganization = await Organization.create({
      name: name,
      description: description,
      location: location,
      userId: req.user.id,
      isRemote: isRemote,
    })
    res.status(201).send(newOrganization)
  } catch (error) {
    next(error)
  }
})

module.exports = router
