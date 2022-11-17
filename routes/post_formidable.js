// not fetching according to date
const router = require("express").Router()
let postSchema = require('../models/posts')
const fs = require('fs')
const formidable = require('express-formidable')
const jwt = require('jsonwebtoken')

const postLikes = require('../models/likes')
const followingModel = require("../models/followingModel")


const jwt_secret = 'this is vipul, shubham secret'

router.use(formidable({
    multiples: true
}))


router.post("/add", (req, res, next) => {
    const auth = req.headers.authtoken


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

    const date = new Date()

    if (req.files.file || (req.files.file && req.fields.desc) ) {
        var img = fs.readFileSync(req.files.file.path,"base64")
        let post = new postSchema({
            uid: uid,
            file:img,
            desc:req.fields.desc,
            date: date

        });
        post.save((err, data) => {
            if (err) {
                next(err)
            }
            else {
                res.status(200).json({message:'post saved successfully'})
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


// for fetching file of following
router.get("/fetch", async(req, res) => {
    const auth = req.headers.authtoken

    
    if(!auth){
        console.log('no auth token from ')
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id



    // -----------------------------------------------------------
    let followingArr = await followingModel.find({uid}, 'following -_id').catch(err => {
        console.log('something went wrong in followingArr', err)
        return res.status(500).json({message:'something went wrong',err})
    })

    if(followingArr.length == 0) return res.status(200).json({message:'no friends of user',})
    
    followingArr = followingArr[0].following
    if(followingArr.length == 0) return res.status(200).json({message:'no friends of user',})
    
    // -----------------------------------------------------------

    // let result = await postSchema.find({uid: {$in: followingArr}} )
    let result = await postSchema.find({uid: {$in: followingArr}}, {}, {sort: {date: -1}} )
    .populate({ path: 'uid', populate: {path: 'name'}})

        // .populate('uid', '_id name email')
        // .populate('name', '-_id name')
        .catch(err => {
            return res.status(500).json({message: 'something went wrong', err})
        })

    // console.log(result)
    res.status(200).json({
        status: 200,
        result
    })
})


// for fetching file of current
router.get("/fetchcurrent", async(req, res) => {
    // const auth = req.headers.authtoken

    
    // if(!auth){
    //     console.log('no auth token from ')
    //     return res.status(500).json({message : "Invalid User"})
    // }

    // const decoded = jwt.decode(auth, jwt_secret)
    // const uid = decoded.id

    const targetUid = req.headers.uid

    // let result = await postSchema.find({uid: {$in: followingArr}} )
    let result = await postSchema.find({uid: targetUid}, {}, {sort: {date: -1}} )
        .populate({ path: 'uid', populate: {path: 'name'}})

        // .populate('uid', '_id name')
        // .populate('name', '-_id name')
        .catch(err => {
            return res.status(500).json({message: 'something went wrong', err})
        })

    // console.log(result)
    res.status(200).json({
        status: 200,
        result
    })
})




module.exports = router