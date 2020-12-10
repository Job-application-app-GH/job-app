const router = require('express').Router()
const cloudinary = require('../cloudinary')
const {Candidate, Organization} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const fileStr = req.body.data
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'Upload',
    })
    let secureURL = uploadResponse.secure_url
    let user = req.user
    let updatedprofile
    if (user.userType === 'CANDIDATE') {
      updatedprofile = await Candidate.update(
        {img: secureURL},
        {
          where: {
            userId: req.user.id,
          },
          returning: true,
          plain: true,
        }
      )
    } else {
      updatedprofile = await Organization.update(
        {img: secureURL},
        {
          where: {
            userId: req.user.id,
          },
          returning: true,
          plain: true,
        }
      )
    }
    res.send(updatedprofile)
  } catch (error) {
    next(error)
  }
})

module.exports = router
