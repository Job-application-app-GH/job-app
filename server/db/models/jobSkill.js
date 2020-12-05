const Sequelize = require('sequelize')
const db = require('../db')

const JobSkill = db.define('job_skill', {
  jobId: Sequelize.INTEGER,
  skillId: Sequelize.INTEGER,
})

module.exports = JobSkill
