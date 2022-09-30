const { application } = require("express");
const express = require("express")
const app = express();


const authentication  = require('./routes/authentication')
// const posts = require('./routes/posts')
const posts = require('./routes/post_formidable')


const session = require("express-session")

const postSchema = require('./models/posts');
const { post } = require("./routes/authentication");


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


app.use( '/err',(req,res,next)=>{
    res.send("something happened wrong with server . please try again..")
})

app.listen(3001,()=>{
    console.log('app is listening on port 8080');
})