// Shubham - friend and unfriend routes are working Correctly
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const followingModel = require('../models/followingModel')

const jwt_secret = 'this is vipul, shubham secret'


// ************************************ route.post ************************************

router.post('/', async (req,res) => {
    var auth = req.headers.authtoken
    
    if(!auth){
        console.log('no auth token')
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = await jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    const targetUid = req.body.targetUid
    if( !targetUid ){
        return res.status(500).json({message : "Invalid User"})
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
                console.log(`now ${uid} & ${targetUid} are friends \n`, response)
                return res.status(200).json({message:`now ${uid} & ${targetUid} are friends `})
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
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    const targetUid = req.body.targetUid
    if( !targetUid ){
        return res.status(500).json({message : "Invalid User"})
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
                console.log(`now ${uid} & ${targetUid} are friends \n`, response)
                return res.status(200).json({message:`now ${uid} & ${targetUid} are unfriends `})
            }
        })
    // })

        // else console.log('no data found')
    } catch (error) {
        console.log("error: ", error)
    }

})

module.exports = router