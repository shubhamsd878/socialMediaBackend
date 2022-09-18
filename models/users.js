const mongoose = require("mongoose")

const conn= require("../config/db")

var userSchema = new mongoose.Schema( {
    _id:mongoose.Schema.ObjectId,
    name:String,
    email:String,
    password:String,
},{
    timestamps:true
}
);



const myModel = new mongoose.model('userData',userSchema);

module.exports= myModel;