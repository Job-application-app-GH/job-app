const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  messageText: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    sender: {
      type: Sequelize.ENUM('CANDIDATE', 'ORGANIZATION'),
    },
  },
})

module.exports = Message
