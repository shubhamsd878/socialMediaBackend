const mongoose = require('mongoose')

const totalFollower = mongoose.Schema({
    totalFollowers :{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('totalFollower', totalFollower)