const User = require('./user')
const Skill = require('./skill')
const Candidate = require('./candidate')
const CandidateSkill = require('./candidateSkill')
const JobSkill = require('./jobSkill')

const Organization = require('./organization')
const Job = require('./job')

const Match = require('./match')
const Message = require('./message')

User.hasOne(Candidate)
Candidate.belongsTo(User)

User.hasOne(Organization)
Organization.belongsTo(User)

Organization.hasMany(Job)
Job.belongsTo(Organization)

Job.belongsToMany(Skill, {through: JobSkill})
Skill.belongsToMany(Job, {through: JobSkill})

JobSkill.belongsTo(Job)
JobSkill.belongsTo(Skill)

Candidate.belongsToMany(Skill, {through: CandidateSkill})
Skill.belongsToMany(Candidate, {through: CandidateSkill})

CandidateSkill.belongsTo(Candidate)
CandidateSkill.belongsTo(Skill)

Job.belongsToMany(Candidate, {through: Match})
Candidate.belongsToMany(Job, {through: Match})

Match.hasMany(Message)
Message.belongsTo(Match)

Match.belongsTo(Job)
Match.belongsTo(Candidate)

module.exports = {
  Candidate,
  Job,
  Match,
  Organization,
  User,
  Skill,
  Message,
  CandidateSkill,
  JobSkill,
}
