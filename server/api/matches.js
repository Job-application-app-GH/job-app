const router = require('express').Router()
const db = require('../db/db')
const {Match} = require('../db/models')

module.exports = router

// Find matching candidates for a Job
//GET '/api/job/:jobId'
router.get('/job/:jobId', async (req, res, next) => {
  try {
    const jobId = req.params.jobId

    const [matchingCandidates] = await db.query(
      `SELECT
          cd.*,
          count("skills".name) AS totalMatchingSkills,
          "m"."isMatch"as match
      FROM 
        candidates AS cd
      INNER JOIN 
        (
          "candidate_skills" AS cs
          INNER JOIN 
            "skills" 
          ON 
            "skills".id = "cs"."skillId"
        )
      ON
        "cd".id = "cs"."candidateId"
        AND "skills".id in (SELECT "js"."skillId" FROM job_skills AS js WHERE "js"."jobId"=?)
      LEFT OUTER JOIN 
        "matches" AS m	
      ON
        "cd".id = m."candidateId"
        AND m."jobId"=?
      WHERE
       "cd".id NOT IN 
         (SELECT 
            "m"."candidateId" 
         FROM 
            matches as m 
         WHERE 
            m."jobId"=?
         and "m"."isMatch" in ('REJECTED_JOB', 'REJECTED_BOTH', 'MATCHED', 'PENDING_JOB'))
      GROUP BY
        "cd".id, 
        match
      ORDER BY 
        match DESC, 
        totalMatchingSkills ASC`,
      {replacements: [jobId, jobId, jobId]}
    )

    let matchesWithSkills = []
    for (let candidate of matchingCandidates) {
      let [skillSet] = await db.query(
        `SELECT skills.name as skillName 
          FROM skills
          WHERE
            id in (SELECT cds."skillId" 
                    FROM candidate_skills AS cds 
                    WHERE cds."candidateId"=?)`,
        {replacements: [candidate.id]}
      )
      let candidateSkills = skillSet.map((skill) => skill.skillname)
      let newCandidate = {...candidate, skills: candidateSkills}
      matchesWithSkills.push(newCandidate)
    }

    res.send(matchesWithSkills)
  } catch (error) {
    next(error)
  }
})

// Find matching jobs for a Candidate
//GET '/api/candidate/:candidateId'
router.get('/candidate/:candidateId', async (req, res, next) => {
  try {
    const candidateId = req.params.candidateId

    const [matchingJobs] = await db.query(
      `SELECT
          "jobs".id,
          "jobs".description,
          "jobs".location,
          "jobs"."organizationId",
          "jobs"."isRemote",
          "jobs".title,
          "org".name AS "orgName",
          "org".img AS "orgImg",
          "org".description AS "orgDescription",
          "org".location AS "orgLocation",
          "org"."userId" AS "userId",
          count("skills".name) AS totalMatchingSkills,
          "m"."isMatch" AS match
      FROM 
        jobs
      INNER JOIN 
        organizations AS org 
      ON 
        jobs."organizationId"=org.id
      INNER JOIN 
        (
          "job_skills" AS js
          INNER JOIN 
            "skills" 
          ON 
            "skills".id = "js"."skillId"
        )
      ON
        "jobs".id = "js"."jobId"
        AND "skills".id IN (SELECT "cs"."skillId" FROM candidate_skills AS cs WHERE "cs"."candidateId" = ?)
      LEFT OUTER JOIN 
        "matches" as m	
      ON
        "jobs".id = m."jobId"
        AND m."candidateId" = ?
      WHERE
      "jobs".id NOT IN 
        (SELECT 
          "m"."jobId" 
        FROM 
          matches AS m 
        WHERE 
          m."candidateId" = ?
        AND "m"."isMatch" IN  ('REJECTED_CANDIDATE', 'REJECTED_BOTH', 'MATCHED', 'PENDING_CANDIDATE'))
      GROUP BY
        "jobs".id, 
        "orgName","orgImg", "orgDescription", "orgLocation", "userId",
        match
      ORDER BY 
        match DESC, 
        totalMatchingSkills ASC
    `,
      {replacements: [candidateId, candidateId, candidateId]}
    )

    let matchesWithSkills = []
    for (let job of matchingJobs) {
      let [skillSet] = await db.query(
        `SELECT skills.name as skillName 
          FROM skills
          WHERE
            id in (SELECT js."skillId" 
                    FROM job_skills AS js 
                    WHERE js."jobId"=?)`,
        {replacements: [job.id]}
      )
      let jobSkills = skillSet.map((skill) => skill.skillname)
      let newJob = {...job, skills: jobSkills}
      matchesWithSkills.push(newJob)
    }

    res.send(matchesWithSkills)
  } catch (error) {
    next(error)
  }
})

// Implement swipe on a candidate by a job
//POST '/api/matches/job'
router.post('/job', async (req, res, next) => {
  try {
    const reqJobId = req.body.jobId
    const reqCandidateId = req.body.candidateId
    const isLiked = req.body.isLiked
    let isPerfectMatch = false

    const matchFromDB = await Match.findOne({
      where: {
        jobId: reqJobId,
        candidateId: reqCandidateId,
      },
    })
    //if no pre-existing record then insert a new row for this combo
    if (matchFromDB === null) {
      //if isLiked= true, then we need to add a record with isMatch=pending
      //if isLiked =false, then we need to add a record with isMatch=false (will not be a viable match)
      if (isLiked) {
        const newMatch = await Match.create({
          jobId: reqJobId,
          candidateId: reqCandidateId,
          isMatch: `PENDING_JOB`,
        })
      } else {
        const newMatch = await Match.create({
          jobId: reqJobId,
          candidateId: reqCandidateId,
          isMatch: `REJECTED_JOB`,
        })
      }
    } //if matchFromDB=== null
    else {
      //NOW since the record is already present in the matches table,
      //we need to take a judicious decision to update this record based on certain conditions
      const isMatch = matchFromDB.isMatch

      if (isMatch === 'PENDING_CANDIDATE') {
        if (isLiked) {
          //change the Pending status to matched, indicating that both parties swiped right on each other
          matchFromDB.isMatch = 'MATCHED'
          isPerfectMatch = true
        } else {
          matchFromDB.isMatch = 'REJECTED_BOTH'
        }
        await matchFromDB.save()
      }

      if (isMatch === `REJECTED_CANDIDATE`) {
        console.log('Match not possible since candidate had rejected this job!')
        matchFromDB.isMatch = 'REJECTED_BOTH'
        await matchFromDB.save()
      }
    }
    const matchType = {isPerfectMatch}
    // res.sendStatus(201)
    res.json(matchType)
  } catch (e) {
    next(e)
  }
})

// Implement swipe on a job by a candidate
//POST '/api/matches/candidate'
router.post('/candidate', async (req, res, next) => {
  try {
    const reqJobId = req.body.jobId
    const reqCandidateId = req.body.candidateId
    const isLiked = req.body.isLiked

    const matchFromDB = await Match.findOne({
      where: {
        jobId: reqJobId,
        candidateId: reqCandidateId,
      },
    })
    //if no pre-existing record then insert a new row for this combo
    if (matchFromDB === null) {
      //if isLiked= true, then we need to add a record with isMatch=pending
      //if isLiked =false, then we need to add a record with isMatch=false (will not be a viable match)
      if (isLiked) {
        const newMatch = await Match.create({
          jobId: reqJobId,
          candidateId: reqCandidateId,
          isMatch: `PENDING_CANDIDATE`,
        })
      } else {
        const newMatch = await Match.create({
          jobId: reqJobId,
          candidateId: reqCandidateId,
          isMatch: `REJECTED_CANDIDATE`,
        })
      }
    } //if matchFromDB=== null
    else {
      //NOW since the record is already present in the matches table,
      //we need to take a judicious decision to update this record based on certain conditions
      const isMatch = matchFromDB.isMatch

      if (isMatch === 'PENDING_JOB') {
        if (isLiked) {
          //change the Pending status to matched, indicating that both parties swiped right on each other
          matchFromDB.isMatch = 'MATCHED'
        } else {
          matchFromDB.isMatch = 'REJECTED_BOTH'
        }
        await matchFromDB.save()
      }

      if (isMatch === `REJECTED_JOB`) {
        console.log('Match not possible since job had rejected this candidate!')
        matchFromDB.isMatch = 'REJECTED_BOTH'
        await matchFromDB.save()
      }
    }
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})
