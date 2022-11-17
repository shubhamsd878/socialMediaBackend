const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    pid: mongoose.Types.ObjectId,
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'names'
    },
    comment:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model('comments', commentSchema)