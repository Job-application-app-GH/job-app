const router = require('express').Router()
const db = require('../db')
const {Candidate, CandidateSkill} = require('../db/models')

module.exports = router

// GET '/api/candidateSkills/:candidateId'
router.get('/:candidateId', async (req, res, next) => {
  try {
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
    res.json(candidate_skills)
  } catch (err) {
    next(err)
  }
})

// POST '/api/candidateSkills/:candidateId'
router.post('/:candidateId', async (req, res, next) => {
  try {
    const candidateId = req.params.candidateId
    const {skills} = req.body

    const candidate = await Candidate.findByPk(candidateId)
    await CandidateSkill.destroy({where: {candidateId}})

    //Now go through the passed skills list and create a list of "selected" skills.
    //Use this selectedSkills list to insert new skillset for the given candidate
    const selectedSkills = skills
      .filter((skill) => skill.selected)
      .map((skill) => skill.id)

    // Insert new record only if user had selected atleast one skill
    if (selectedSkills.length) {
      await candidate.addSkills(selectedSkills)
    }

    res.status(201).send()
  } catch (e) {
    next(e)
  }
})
