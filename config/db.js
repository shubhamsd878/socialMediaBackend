const mongoose = require('mongoose');

//  mongoose.connect('mongodb://localhost/socialMedia').then( ()=>{
 mongoose.connect('mongodb+srv://shubhamsd878:18jan2002@swag-zinn.dgmu6ev.mongodb.net/?retryWrites=true&w=majority/socialMedia').then( ()=>{
    console.log("connected to db");
}).catch( (e)=>{
    console.log("can't connect to db ");
    // console.log(e);
});

module.exports= mongoose;