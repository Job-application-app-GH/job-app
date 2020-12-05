const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/namecard', require('./namecard'))
router.use('/candidateSkills', require('./candidateSkills'))
router.use('/jobSkills', require('./jobSkills'))
router.use('/candidate', require('./candidate'))
router.use('/organization', require('./organization'))
router.use('/job', require('./job'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
