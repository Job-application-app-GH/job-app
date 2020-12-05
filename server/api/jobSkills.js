const router = require('express').Router()
const db = require('../db')
const {Job, JobSkill} = require('../db/models')

module.exports = router

// GET '/api/jobSkills/:jobId'
router.get('/:jobId', async (req, res, next) => {
  try {
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

    res.json(job_skills)
  } catch (err) {
    next(err)
  }
})

// POST '/api/jobSkills/::jobId'
router.post('/:jobId', async (req, res, next) => {
  try {
    const jobId = req.params.jobId
    const {skills} = req.body

    const job = await Job.findByPk(jobId)
    await JobSkill.destroy({where: {jobId}})

    //Now go through the passed skills list and create a list of "selected" skills.
    //Use this selectedSkills list to insert new skillset for the given candidate
    const selectedSkills = skills
      .filter((skill) => skill.selected)
      .map((skill) => skill.id)

    // Insert new record only if user had selected atleast one skill
    if (selectedSkills.length) {
      await job.addSkills(selectedSkills)
    }

    res.status(201).send()
  } catch (e) {
    next(e)
  }
})
