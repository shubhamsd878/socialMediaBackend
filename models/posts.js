const mongoose = require('mongoose')

const conn = require('../config/db')
const { post } = require('../routes/authentication')
const postSchema = new mongoose.Schema({
    pid:new mongoose.Schema.ObjectId,
    uid:{
        type:String,
        },
    // file:{
    //     type:Buffer,
    //     required:false,
    // },

    // file: Buffer,
    file: {
        file_name: String,
        data: Buffer,
        content_type: String
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
   

module.exports = new mongoose.model('postData',postSchema)

// module.exports={
//     postdata,
// }