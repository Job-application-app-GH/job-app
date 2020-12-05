const Sequelize = require('sequelize')
const db = require('../db')

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING,
    allownull: false,
    validate: {
      notEmpty: true,
    },
  },
  img: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  description: {
    type: Sequelize.TEXT,
  },
  location: {
    type: Sequelize.STRING,
    allownull: false,
    validate: {
      notEmpty: true,
    },
  },
  isRemote: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
})

module.exports = Organization
