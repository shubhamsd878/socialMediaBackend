const mongoose = require('mongoose')

const savedSchema = mongoose.Schema({
    pid: mongoose.Types.ObjectId,
    dateTime: Date.now()
})

module.exports = mongoose.model('savedPost', savedSchema)