const router = require('express').Router()
const {User} = require('../db/models')
// const adminOnly = require('./accessControl')
module.exports = router

// GET '/api/users' ADMIN ONLY
router.get('/', async (req, res, next) => {
  try {
    console.log('Received the request for users!!')
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
