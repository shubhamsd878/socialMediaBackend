const mongoose = require('mongoose')

const conn = require('../config/db')

const likesSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,       // _id is same of post_id
    pid: String,
    totalLikes:Number,
    users: [mongoose.Types.ObjectId]
})

const postModel =  new  mongoose.model("postLikes",likesSchema)

 module.exports=  postModel  