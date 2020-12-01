const Sequelize = require('sequelize')
const db = require('../db')


const Match = db.define('match', {
    isMatch: {
        type: Sequelize.ENUM('PENDING', 'TRUE', 'FALSE'),
        allowNull: false
    }
    })
    
    module.exports = Match