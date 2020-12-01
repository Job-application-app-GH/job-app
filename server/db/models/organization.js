const Sequelize = require('sequelize')
const db = require('../db')

const Organization = db.define('organization', {
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
    }

})

module.exports = Organization