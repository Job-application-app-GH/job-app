const router = require('express').Router()
const {cloudinary} = require('../../src/CloudinaryService')

router.post('/', async (req, res, next) => {
  try {
    let image = req.body.data
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: 'Upload',
    })
    console.log(uploadedImage)
    res.json({msg: 'yayyyy'})
  } catch (error) {
    next(error)
  }
})

module.exports = router
