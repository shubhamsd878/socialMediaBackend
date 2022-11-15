const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    totalLike: Number
})

module.exports = mongoose.model('totalLikes', likeSchema)

// not required