const Sequelize = require('sequelize')
const db = require('../db')

const Match = db.define('match', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isMatch: {
    type: Sequelize.ENUM(
      'PENDING_JOB',
      'PENDING_CANDIDATE',
      'MATCHED',
      'REJECTED_JOB',
      'REJECTED_CANDIDATE',
      'REJECTED_BOTH'
    ),
    allowNull: false,
  },
})

module.exports = Match
