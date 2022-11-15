const { application } = require("express");
const express = require("express")
const app = express();
const cors = require('cors')
const session = require("express-session")

app.use(cors())     


const authentication  = require('./routes/authentication')
const posts = require('./routes/post_formidable')
// const { post } = require("./routes/authentication");
const following = require("./routes/following");
const searchUser = require("./routes/searchUser");
const userDetails = require('./routes/userDetails')
const like = require('./routes/like')
const comments = require('./routes/comment')


app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  
app.set('view engine','ejs');
app.set('views',__dirname+ '/views');

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/authentication',authentication)
app.use('/posts',posts);
app.use('/follow',following )
app.use('/search',searchUser )
app.use('/userDetails', userDetails )
app.use('/likes', like )
app.use('/comments', comments)



// root middleware

const root = (req,res,next)=>{
    if( req.session.user)
    {
        return next();
    }
    else
    {
       return  next('route');
    }
}


app.get('/',root ,(req,res)=>{
    

    res.send(`hello ${req.session.user}`)

})

app.get( '/',(req,res)=>{
    res.send("welcome to shubham's social media..")
})


app.use( (err,req,res,next)=>{
    // res.send("server broken by chance please wait we ar working..")
    res.send(err)
})

app.listen(3001,()=>{
    console.log('app is listening on port 3001');
})