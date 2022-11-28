const mongoose = require('mongoose')

const savedSchema = mongoose.Schema({
    pid: {
        type:mongoose.Types.ObjectId,
        ref: 'postData'
    },
    uid: {
        type:mongoose.Types.ObjectId,
        ref: 'userdata'
    },
    dateTime: {
        type: Date,
        default: Date.now()
    }
    
})

module.exports = mongoose.model('savedPost', savedSchema)