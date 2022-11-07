const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    pid: mongoose.Types.ObjectId,
    uid: mongoose.Types.ObjectId,
    Comment: String,
    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model('comments', commentSchema)