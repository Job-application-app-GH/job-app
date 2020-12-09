const router = require('express').Router()
const cloudinary = require('../cloudinary')
const {Candidate, Organization} = require('../db/models')

// router.get("/", async (req, res, next) => {
//   try {
//     let {resources} = await cloudinary.search.expression()
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    // console.log('req.user-->', req.user)
    const fileStr = req.body.data
    // console.log('TYPE: ', fileStr)
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'Upload',
    })
    let secureURL = uploadResponse.secure_url
    let user = req.user
    // let updatedprofile
    let findUser = await Candidate.findOne({
      where: {
        userId: req.user.id,
      },
    })
    console.log('user usertype: ', user.userType)
    let updatedprofile = await Candidate.update(
      {img: secureURL},
      {
        where: {
          userId: req.user.id,
        },
        returning: true,
        plain: true,
      }
    )
    // }
    // else {
    //   updatedprofile = await Organization.update(
    //     {img: secureURL},
    //     {
    //       where: {
    //         userId: req.user.id,
    //       },
    //       returning: true,
    //       plain: true,
    //     }
    //   )
    // }
    console.log('updated profile', updatedprofile)
    // console.log('url--->', secureURL)
    // console.log('updated Profile[0]-->', updatedprofile[0])
    res.send(updatedprofile)
  } catch (error) {
    next(error)
  }
})

module.exports = router
