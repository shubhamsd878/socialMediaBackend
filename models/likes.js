const mongoose = require('mongoose')

const conn = require('../config/db')

const likesSchema = new mongoose.Schema({
    pid: String,
    likes:Number,
    users: [mongoose.Types.ObjectId]
})

const postModel =  new  mongoose.model("postLikes",likesSchema)

 module.exports=  postModel  