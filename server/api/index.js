const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/candidateSkills', require('./candidateSkills'))
router.use('/jobSkills', require('./jobSkills'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
