const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//updates user type as "CANDIDATE" OR "ORGANIZATION"
router.put('/', async (req, res, next) => {
  console.log('REQ BODY------>>>>>', req.body)
  try {
    let user = req.user.id
    console.log('req user--->', req.user)
    let updatedUser = await User.update(req.body, {
      where: {
        id: user,
      },
      returning: true,
      plain: true,
    })
    res.send(updatedUser[1])
  } catch (error) {
    next(error)
  }
})

module.exports = router
