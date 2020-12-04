const router = require('express').Router()
// const {User} = require('../db/models')
const db = require('../db')
// const adminOnly = require('./accessControl')
module.exports = router

// GET '/api/jobSkills/:jobId'
router.get('/:jobId', async (req, res, next) => {
  try {
    console.log('Received the request for job skills!!')

    //ARCHANA:
    // Get the id either from req object or pass it in the req url, maybe?
    // Can be finalized after the login functionality is completed
    // const jobId = parseInt(2)
    const [job_skills] = await db.query(
      `
        SELECT a.id, a.name, (b."jobId" is not null) as selected
        FROM skills a 
        LEFT OUTER JOIN job_skills b
        ON a.id = b."skillId"
        AND b."jobId"= ?
          `,
      {replacements: [req.params.jobId]}
    )
    console.log('job skills are : ', job_skills)
    res.json(job_skills)
  } catch (err) {
    next(err)
  }
})
