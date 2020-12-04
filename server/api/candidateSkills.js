const router = require('express').Router()
// const {User} = require('../db/models')
const db = require('../db')
// const adminOnly = require('./accessControl')
module.exports = router

// GET '/api/candidateSkills/:candidateId'
router.get('/:candidateId', async (req, res, next) => {
  try {
    console.log('Received the request for candidate skills!!')

    //ARCHANA:
    // Get the id either from req object or pass it in the req url, maybe?
    // Can be finalized after the login functionality is completed
    // const candidateId = parseInt(2)
    const [candidate_skills] = await db.query(
      `
        SELECT a.id, a.name, (b."candidateId" is not null) as selected
        FROM skills a 
        LEFT OUTER JOIN candidate_skills b
        ON a.id = b."skillId"
        AND b."candidateId"= ?
          `,
      {replacements: [req.params.candidateId]}
    )
    console.log('candidate skills are : ', candidate_skills)
    res.json(candidate_skills)
  } catch (err) {
    next(err)
  }
})
