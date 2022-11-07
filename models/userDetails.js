const mongoose = require('mongoose')

const userDetailSchema = mongoose.Schema({
    uid: mongoose.Types.ObjectId,
    profilePic: Buffer,
    coverImage: Buffer,
    Description: String
})

module.exports = new mongoose.model('userDetails', userDetailSchema)