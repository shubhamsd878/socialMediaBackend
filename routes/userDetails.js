// Shubham: check whether profile updated or not in database
// Shubham: anaysis if it's a problem -- wrong logic, problem is I mistakenly made the _id = objectId by upserting 

const router = require('express').Router()
const formidable = require('express-formidable')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const userDetails = require('../models/userDetails')
const jwt_secret = 'this is vipul, shubham secret'


router.use(formidable({
    multiples: true
}))


// -------------------------------------------------------------------------------------------------------
// ************   GET Routes **************

// -------------------------------------------------------------------------------------------------------
router.get('/coverPic', (req, res) => {
    
    console.log('hii')
    
    const targetUid = req.headers.uid
    console.log("hii from get cover, uid: ", targetUid)
    if( !targetUid) return res.status(400).json({message:'no target uid'})
    userDetails.findById(targetUid, 'coverPic -_id', (err, response) => {
        if (err) return res.status(500).json({ message: 'something went wrong', err })

        return res.status(200).json({ message: 'fetch successful', response: response })
    })

})


// -------------------------------------------------------------------------------------------------------
router.get('/profilePic', async (req, res) => {

    const targetUid = req.headers.uid
    if(!targetUid){
        console.log('no target uid')
        return res.status(400).json({message: 'no targetUid'})
    } 
    userDetails.find({_id: targetUid}, 'profilePic -_id', (err, response) => {
        if (err) return res.status(500).json({ message: 'something went wrong', err })

        return res.status(200).json({ message: 'fetch successful', response: response })
    })
})


// -------------------------------------------------------------------------------------------------------
router.get('/description', async (req, res) => {
    // const auth = req.headers.authtoken

    // if (!auth) {
    //     console.log('no auth token')
    //     return res.status(500).json({ message: "Invalid User" })
    // }

    // const decoded = await jwt.decode(auth, jwt_secret)
    // const uid = decoded.id

    const targetUid = req.headers.uid

    userDetails.findById(targetUid, 'description -_id', (err, response) => {
        if (err) return res.status(500).json({ message: 'something went wrong', err })

        return res.status(200).json({ message: 'fetch successful', response: response })
    })
})





// -------------------------------------------------------------------------------------------------------
router.put('/profilePic', async (req, res) => {
    const auth = req.headers.authtoken

    if (!auth) {
        console.log('no auth token')
        return res.status(500).json({ message: "Invalid User" })
    }

    const decoded = await jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    
    if (!req.files.profilePic) {
        console.log('no files selected')
        return res.status(400).json({ message: 'no files selected' })
    }

    console.log('file: ' + req.files.profilePic)
    
    var profilePicFile = req.files.profilePic

    var profilePicBase64 = fs.readFileSync( profilePicFile.path, "base64")

    let updateProfile = {
        profilePic: profilePicBase64,
    }

    console.log('uid: ', uid)
    userDetails.findByIdAndUpdate(uid, updateProfile, {upsert: true}, (err, response) => {
        if (err) {
            return res.status(500).json({message: 'something went wrong', err})
        }
        else {
            console.log('profilePic updated Successfully')
            return res.status(200).json({ message: 'Profile updated successfully', response })
        }
    })
    

})







// -------------------------------------------------------------------------------------------------------

router.put('/coverPic', async (req, res) => {
    const auth = req.headers.authtoken

    if (!auth) {
        console.log('no auth token')
        return res.status(500).json({ message: "Invalid User" })
    }

    const decoded = await jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    
    if (!req.files.coverPic) {
        console.log('no files selected')
        return res.status(400).json({ message: 'no files selected' })
    }

    console.log('file: ' + req.files.coverPic)
    
    var coverPicFile = req.files.coverPic

    var coverPicBase64 = fs.readFileSync( coverPicFile.path, "base64")

    let updateProfile = {
        coverPic: coverPicBase64,
    }

    console.log('uid: ', uid)
    userDetails.findByIdAndUpdate(uid, updateProfile, {upsert: true}, (err, response) => {
        if (err) {
            return res.status(500).json({message: 'something went wrong', err})
        }
        else {
            console.log('coverPic updated Successfully for ', uid)
            return res.status(200).json({ message: 'Profile updated successfully' })
        }
    })
    

})




// -------------------------------------------------------------------------------------------------------
router.put('/description', async (req, res) => {
    const auth = req.headers.authtoken

    if (!auth) {
        console.log('no auth token')
        return res.status(500).json({ message: "Invalid User" })
    }

    const decoded = await jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    
    if (!req.fields.description) {
        console.log('no description')
        return res.status(400).json({ message: 'no description' })
    }

    console.log('description: ' + req.fields.description)
    
    var description = req.fields.description
    let updateProfile = {
        description
    }

    console.log('uid: ', uid)
    userDetails.findByIdAndUpdate(uid, updateProfile, {upsert: true}, (err, response) => {
        if (err) {
            return res.status(500).json({message: 'something went wrong', err})
        }
        else {
            console.log('description updated Successfully for ', uid)
            return res.status(200).json({ message: 'Profile updated successfully' })
        }
    })
    

})

module.exports = router