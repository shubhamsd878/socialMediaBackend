const mongoose = require("mongoose")

// const conn= require("../config/db")

var userSchema = new mongoose.Schema( {
 
    name: String,
    email:{
        type: String,
        unique: true
    },
    password:String,
},{
    timestamps:true
}
);



const myModel = new mongoose.model('userdata',userSchema);

module.exports= myModel;