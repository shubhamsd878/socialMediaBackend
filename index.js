// const { application } = require("express");
const express = require("express")
const app = express();
const cors = require('cors')
const bodyparser = require('body-parser')
const dbConfig = require('./config/db')     //only need to import no need to call

app.use(cors())     


const authentication  = require('./routes/authentication')
const posts = require('./routes/post_formidable')
const following = require("./routes/following");
const searchUser = require("./routes/searchUser");
const userDetails = require('./routes/userDetails')
const like = require('./routes/like')
const comments = require('./routes/comment')
const saved = require('./routes/saved')


// app.set('trust proxy', 1) // trust first proxy


  
// app.set('view engine','ejs');
// app.set('views',__dirname+ '/views');

// app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
// app.use(express.urlencoded({extended:false}))



app.use('/authentication',authentication)
app.use('/posts',posts);
app.use('/follow',following )
app.use('/search',searchUser )
app.use('/userDetails', userDetails )
app.use('/likes', like )
app.use('/comments', comments)
app.use('/saved', saved)



app.listen(3001,()=>{
    console.log('app is listening on port 3001');
})