const router = require('express').Router()
const {Match} = require('../db/models')

module.exports = router
const CANDIDATE = 'CANDIDATE'
const JOB = 'JOB'

// Implement swipe on a candidate by a job
//POST '/api/matches/job'
router.post('/job', async (req, res, next) => {
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
    res.sendStatus(201)
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
