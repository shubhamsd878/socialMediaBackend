const mongoose = require('mongoose');
// const MONGODB_URI = 'mongodb://localhost/socialMedia';
// const MONGODB_URI = 'mongodb+srv://shubhamsd878:18jan2002@swag-zinn.dgmu6ev.mongodb.net/SocialMedia?retryWrites=true&w=majority';
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
console.log("", MONGODB_URI);
mongoose.connect(MONGODB_URI).then( ()=>{
    console.log("connected to db");
}).catch( (e)=>{
    console.log("can't connect to db ");
    console.log(e);
});

module.exports= mongoose;