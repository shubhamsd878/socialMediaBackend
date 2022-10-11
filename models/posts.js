const mongoose = require('mongoose')

const conn = require('../config/db')
const { post } = require('../routes/authentication')
const postSchema = new mongoose.Schema({
    uid:String,
    pid:String,
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