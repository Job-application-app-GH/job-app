const Candidate = require('./candidate')
const Job = require('./job')
const Match = require('./match')
const Organization = require('./organization')
const User = require('./user')
const Skill = require('./skill')
const Message = require('./message')

User.hasOne(Candidate)
Candidate.belongsTo(User)

User.hasOne(Organization)
Organization.belongsTo(User)

Organization.hasMany(Job)
Job.belongsTo(Organization)

Job.belongsToMany(Skill, {through: 'job_skills'})
Skill.belongsToMany(Job, {through: 'job_skills'})

Candidate.belongsToMany(Skill, {through: 'candidate_skills'})
Skill.belongsToMany(Candidate, {through: 'candidate_skills'})

Job.belongsToMany(Candidate, {through: Match})
Candidate.belongsToMany(Job, {through: Match})

Match.hasMany(Message)
Message.belongsTo(Match)

module.exports = {
  Candidate,
  Job,
  Match,
  Organization,
  User,
  Skill,
  Message,
}
