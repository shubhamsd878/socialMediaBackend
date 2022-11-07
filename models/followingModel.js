const mongoose = require('mongoose')

const followingSchema = mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        required: true
        
    }, 
    // following: [mongoose.Types.ObjectId]
    following:{
        type: [String],
        required: true
    } 
})

module.exports = mongoose.model('following', followingSchema)