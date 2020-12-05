const Sequelize = require('sequelize')
const db = require('../db')

const CandidateSkill = db.define('candidate_skill', {
  candidateId: Sequelize.INTEGER,
  skillId: Sequelize.INTEGER,
})

module.exports = CandidateSkill
