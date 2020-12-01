const db = require('../server/db')
const {
  Candidate,
  Job,
  Match,
  Message,
  Organization,
  Skill,
  User,
} = require('../server/db/models')

const userData = [
  {
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
    userType: 'CANDIDATE',
    email: 'dog@gmail.com',
    password: '123',
  },
  {
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
    userType: 'CANDIDATE',
    email: 'cat@gmail.com',
    password: '123',
  },
  {
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
    userType: 'CANDIDATE',
    email: 'cheetah@gmail.com',
    password: '123',
  },
  {
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
    userType: 'ORGANIZATION',
    email: 'bird@gmail.com',
    password: '123',
  },
  {
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
    userType: 'ORGANIZATION',
    email: 'fish@gmail.com',
    password: '123',
  },
  {
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
    userType: 'ORGANIZATION',
    email: 'bear@gmail.com',
    password: '123',
  },
]

const candidateData = [
  {
    name: 'Archana',
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Student',
    currentCompany: 'Grace Hopper',
  },
  {
    name: 'Mackenzie',
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Student',
    currentCompany: 'Grace Hopper',
  },
  {
    name: 'Maria',
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Student',
    currentCompany: 'Grace Hopper',
  },
]

const organizationData = [
  {
    name: 'Google',
    description: 'sfnoergqorwgowqingwoing',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'Yahoo',
    description: 'sfnoergqorwgowqingwoing',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'Facebook',
    description: 'sfnoergqorwgowqingwoing',
    location: 'Worldwide',
    isRemote: true,
  },
]

const jobData = [
  {
    title: 'Software Engineer',
    description: 'fnownrgiebrg',
    location: 'New York',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description: 'fnownrgiebrg',
    location: 'New York',
    isRemote: true,
  },
  {
    title: 'Backend Engineer',
    description: 'fnownrgiebrg',
    location: 'New York',
    isRemote: true,
  },
]

const skillData = [
  {
    name: 'JavaScirpt',
  },
  {
    name: 'React',
  },
  {
    name: 'Redux',
  },
  {
    name: 'Sequelize',
  },
  {
    name: 'Express',
  },
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [users, candidates, organizations, jobs, skills] = await Promise.all([
    User.bulkCreate(userData, {returning: true}),
    Candidate.bulkCreate(candidateData, {returning: true}),
    Organization.bulkCreate(organizationData, {returning: true}),
    Job.bulkCreate(jobData, {returning: true}),
    Skill.bulkCreate(skillData, {returning: true}),
  ])

  await users[0].setCandidate(candidates[0])
  await users[1].setCandidate(candidates[1])
  await users[2].setCandidate(candidates[2])
  await users[3].setOrganization(organizations[0])
  await users[4].setOrganization(organizations[1])
  await users[5].setOrganization(organizations[2])
  await candidates[0].addSkills([skills[0], skills[1]])
  await candidates[1].addSkills([skills[1], skills[2], skills[4]])
  await candidates[2].addSkills([skills[0], skills[3], skills[4]])
  await organizations[0].addJobs(jobs[0])
  await organizations[1].addJobs(jobs[1])
  await organizations[2].addJobs(jobs[2])
  await jobs[0].addSkills([skills[0], skills[1]])
  await jobs[1].addSkills([skills[1], skills[2], skills[4]])
  await jobs[2].addSkills([skills[0], skills[3], skills[4]])
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
