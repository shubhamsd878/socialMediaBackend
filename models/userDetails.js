const mongoose = require('mongoose')

const userDetailSchema = mongoose.Schema({
    uid: mongoose.Types.ObjectId,
    profilePic: String,
    coverPic: String,
    description: String
})

module.exports = new mongoose.model('userDetails', userDetailSchema)