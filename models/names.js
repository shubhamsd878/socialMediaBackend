const mongoose = require('mongoose')

const names = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String
})

module.exports = mongoose.model('names', names)