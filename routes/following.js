// Shubham - friend and unfriend routes are working Correctly
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const followingModel = require('../models/followingModel')

const jwt_secret = 'this is vipul, shubham secret'


// **********************************check if isFriend*******************************
router.get('/', async (req, res) => {
    var auth = req.headers.authtoken
    
    if(!auth){
        console.log('no auth token')
        return res.status(400).json({message : "Invalid User"})
    }

    const decoded = await jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    const targetUid = req.headers.targetuid
    if(!targetUid) return res.status(400).json({message:"no uid"})

    followingModel.find({uid: uid}, (err, response) => {
        if(err) return res.status(500).json({message:"something went wrong", err})

        console.log('uid: ', uid)
        console.log('targetUid: ', targetUid)

        console.log('response ',response)
        let followingArr = response[0].following

        console.log('followingArr: ', followingArr)
        console.log('followingArr.includes(targetUid): ', followingArr.includes(targetUid))

        if(followingArr.includes(targetUid)){
            return res.status(200).json({message:'yes, both are friends', isFollowing:true })
        }
        res.status(201).json({message:'no, both are not friends', isFollowing:false })
        
    })
})


// ************************************ route.post ************************************

router.post('/', async (req,res) => {
    var auth = req.headers.authtoken
    
    console.log(req.headers)
    if(!auth){
        console.log('no auth token')
        return res.status(400).json({message : "Invalid Userno authtoken"})
    }

    const decoded = await jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    const targetUid = req.headers.targetuid
    if( !targetUid ){
        return res.status(400).json({message : "Invalid User, no uid"})
    }

    
    try {   

        // followingModel.find({uid}, async(err, respon)=> {
        //     if(err) console.log('no results found')
         followingModel.updateOne({uid}, {
            // console.log(4)
            $addToSet: {
                following: targetUid
            }
        }, {upsert: true}, (err, response)=>{
            if( err ) return res.status(500).json({message: 'something went wrong', err})
            else{
                console.log(`now ${uid} is following ${targetUid} \n`, response)
                return res.status(200).json({message:`now ${uid} is following ${targetUid}`})
            }
        })
    // })

        // else console.log('no data found')
    } catch (error) {
        console.log("error: ", error)
    }

})



// ************************************ route.delete ************************************
router.delete('/', (req,res) => {
    const auth = req.headers.authtoken
    
    if(!auth){
        console.log('no auth token')
        return res.status(500).json({message : "Invalid User, no authtoken"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    const targetUid = req.headers.targetuid
    if( !targetUid ){

        // console.log(req.heders)
        return res.status(500).json({message : "Invalid User, no uid"})
    }

    try {

        // followingModel.find({uid}, async(err, respon)=> {
        //     if(err) console.log('no results found')
         followingModel.updateOne({uid}, {
            // console.log(4)
            $pull: {
                following: targetUid
            }
        }, {upsert: true}, (err, response)=>{
            if( err ) return res.status(500).json({message: 'something went wrong', err})
            else{
                console.log(`now ${uid} unfollowed ${targetUid} \n`, response)
                return res.status(200).json({message:`now ${uid} is unfollowed ${targetUid} `})
            }
        })
    // })

        // else console.log('no data found')
    } catch (error) {
        console.log("error: ", error)
    }

})

module.exports = router