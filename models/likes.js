const mongoose = require('mongoose')

const conn = require('../config/db')

const likesSchema = new mongoose.Schema({
    pid: String,
    likes:Number,
})

const postModel =  new  mongoose.model("postLikes",likesSchema)

 module.exports=  postModel  