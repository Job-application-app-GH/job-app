const Sequelize = require('sequelize')
const db = require('../db')

const Match = db.define('match', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isMatch: {
    type: Sequelize.ENUM('PENDING', 'TRUE', 'FALSE'),
    allowNull: false,
  },
})

module.exports = Match
