const mongoose = require('mongoose')

const conn = require('../config/db')
const { post } = require('../routes/authentication')
const postSchema = new mongoose.Schema({
    pid:new mongoose.Schema.ObjectId,
    uid:{
        type:String,
        },
    file:{
        type:Binary,
        required:false,
    },
    desc :
    {
        type:String,
        required:false
    },
    date_time:{
        type:Date,
        default:Date.now()
    }

    })
   

const postdata = new mongoose.model('postData',postSchema)

module.exports={
    postdata,
}