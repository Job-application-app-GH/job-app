const Sequelize = require('sequelize')
const db = require('../db')

const Candidate = db.define('candidate', {
    name: {
        type: Sequelize.STRING,
        allownull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT
    },
    location: {
        type: Sequelize.STRING,
        allownull: false,
        validate: {
            notEmpty: true
        }
    },
    isRemote: {
     type: Sequelize.BOOLEAN,
     defaultValue: true
    },
    currentRole: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    currentCompany: {
        type: Sequelize.STRING,
        allowNull: true
    }

})

module.exports = Candidate