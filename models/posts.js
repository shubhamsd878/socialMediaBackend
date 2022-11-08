const mongoose = require('mongoose')

// const conn = require('../config/db')
const user = require('./users')
const { post } = require('../routes/authentication')
const postSchema = new mongoose.Schema({
    uid: {
        type:mongoose.Types.ObjectId,
        ref: 'userdata'
    },
    pid: mongoose.Types.ObjectId,
    file:String,
    desc:String,
    date:{
        type:Date,
        default:Date.now()
    }
    },
    {
        versionKey:false
    })
   

module.exports = new mongoose.model('postData',postSchema)

// module.exports={
//     postdata,
// }