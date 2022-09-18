const postModel = require("../../models/posts")
const mongoose = require('mongoose')
const { Schema } = require('mongoose');



const add = (req,res)=>{
    var data = new postModel.postdata({
        pid:new mongoose.Types.ObjectId,
        uid:"vipul123",
        

        
    })


    data.save( ( err,result)=>{
        if( err) console.log(err);
        else
        {
            res.send(result)
        }
    })

    
}


module.exports= {
    add,
}