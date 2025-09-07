const mongoose = require('mongoose');
// const MONGODB_URI = 'mongodb://localhost/socialMedia';
const MONGODB_URI = 'mongodb+srv://shubhamsd878:18jan2002@swag-zinn.dgmu6ev.mongodb.net/SocialMedia?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI).then( ()=>{
    console.log("connected to db");
}).catch( (e)=>{
    console.log("can't connect to db ");
    console.log(e);
});

module.exports= mongoose;