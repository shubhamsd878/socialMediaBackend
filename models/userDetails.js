const mongoose = require('mongoose')

const userDetailSchema = mongoose.Schema({
    uid: mongoose.Types.ObjectId,
    profilePic: Buffer,
    coverPic: Buffer,
    description: String
})

module.exports = new mongoose.model('userDetails', userDetailSchema)