const postModel = require("../../models/posts")
const mongoose = require('mongoose')
const { Schema } = require('mongoose');



const add = (req,res)=>{

    postModel.postdata.findOne({name:"raju bhai is best"},(err,result)=>{
        if( err) console.log(err);
        else
        {
            var data = new postModel.postdata({
                pid:new mongoose.Types.ObjectId,
                uid:"rajubhai1234",
                file:req.body.file,
                desc:req.body.desc
            })

            data.save( ( err)=>{
                if (err)
                {
                    console.log("error found..");
                    res.send(" server broken")
                } 
                    
                else
                {
                    res.redirect("/");
                }
            })
        }
    });


    // var data = new postModel.postdata({
    //     pid:new mongoose.Types.ObjectId,
    //     uid:"vipul123",
        

        
    // })


    // data.save( ( err,result)=>{
    //     if( err) console.log(err);
    //     else
    //     {
    //         res.send(result)
    //     }
    // })

    
}


module.exports= {
    add,
}