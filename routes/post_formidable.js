const router = require("express").Router()
let postSchema = require('../models/posts')
const fs = require('fs')
const formidable = require('express-formidable')
const { nextTick } = require("process")
const { default: mongoose } = require("mongoose")

 const postLikes = require('../models/likes')
const jwt = require('jsonwebtoken')


const jwt_secret = 'this is vipul, shubham secret'

router.use(formidable({
    multiples: true
}))


router.post("/add", (req, res, next) => {
    const auth = req.headers.authtoken

    // console.log('auth-token is: ' + auth)
    // console.log('headers: ' + JSON.stringify(req.headers))
    
    if(!auth){
        console.log('no auth token')
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id


    // now uid contains uid of the user sending file
    // save file to the database with .status().json({status, message})


    if( !req.files.file ){
        console.log(req.files)
        console.log('upload a file')
        return res.status(501).json({message : "upload a file"})
    }

    if (req.files.file || (req.files.file && req.fields.desc) ) {
        var img = fs.readFileSync(req.files.file.path,"base64")
        let post = new postSchema({
            uid:"raju",
            pid:"raju123",
            file:img,
            desc:req.fields.desc,

        });
        post.save((err, data) => {
            if (err) {
                next(err)
            }
            else {
                res.send(data)
            }
        })


//================================================================================== 
            // ****Not working*****
            //Saving whole file at once 
            // post.file = file

    }
    else {
        next(err);
    }
})

// for fetching file
router.get("/fetch", (req, res) => {
    postSchema.find({}, (err, data) => {
        if (err) console.log(err);
        else {

            // postLikes.postLikes.find({},(err,result)=>{
            //     console.log("raju bhai");
            // })

            // var img = new Buffer.from(data.file,"base64");
            // fs.writeFileSync('max.png',img)


            res.status(200).send({
                data:data
            })
        }
    })

})


router.post('/')

module.exports = router