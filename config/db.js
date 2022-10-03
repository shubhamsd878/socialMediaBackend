const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/socialMedia').then( ()=>{
    console.log("connected to db");
}).catch( (e)=>{
    console.log("can't connect to db ");
    // console.log(e);
});

module.exports= mongoose;