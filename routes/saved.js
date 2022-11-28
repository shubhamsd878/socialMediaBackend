const router = require("express").Router()
const jwt = require('jsonwebtoken')

const saved = require('../models/saved')

const jwt_secret = 'this is vipul, shubham secret'

router.get('/isSaved', (req, res) => {
    const auth = req.headers.authtoken
    const pid = req.headers.pid

    if(!auth){
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    if( !uid || !pid ){
        console.log('no uid')
        return res.status(501).json({message : "no uid or pid"})
    }


    saved.find({uid, pid}, (err, resp) => {
        if( err) return res.status(500).json({message:'something went wrong', err})

        // console.log(resp)
        const result = resp.length > 0 ? true : false
        res.status(200).json({message: 'isSaved fetch successful', result})

    })

})



router.get('/', async (req,res) => {
    const auth = req.headers.authtoken
    const skip = req.headers.skip
    const limit = req.headers.limit

    if(!auth){
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    if( !uid ){
        console.log('no uid')
        return res.status(501).json({message : "upload a file"})
    }

    const totalPosts = await saved.count({uid})


    let savedPosts = await saved.find({uid},{}, {sort: {dateTime: -1}})
    .populate({path:'pid', populate:{path:'uid'}})
    .skip(skip)
    .limit(limit)
    .catch(err => {return res.status(500).json({message:'something went wrong',err})} )

    
    res.status(200).json({message:'saved fetch successfull', posts: savedPosts, totalPosts})

})


// ---------------- route to save post --------------
router.post('/', (req, res) => {
    const auth = req.headers.authtoken
    const pid = req.headers.pid

    if(!auth){
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    if( !pid || !uid ){
        console.log('no pid or uid')
        return res.status(501).json({message : "no uid or pid"})
    }

    const date = new Date()

    const newSave = new saved({
        uid, pid, dateTime: date
    })

    newSave.save( (err, data) => {
        if(err) return res.status(500).json({message:'something went wrong', err})

        return res.status(200).json({message:'saved successful', result: true})
    })

})


router.delete('/', (req, res) => {
    const auth = req.headers.authtoken
    const pid = req.headers.pid

    if(!auth){
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    if( !pid || !uid ){
        console.log('no pid or uid')
        return res.status(501).json({message : "no uid or pid"})
    }
    saved.remove({uid, pid},  (err, resp) => {
        if( err ) return res.status(500).json({messgage:'something went wrong', err})
        
        res.status(200).json({message:'saved successfully removed', result: true})
    })
    
    // --> the below logic only deletes once, but the above logic delete all overlaps of same post to avoid bug

    // const _id = req.headers._id

    // saved.findByIdAndRemove(_id, (err, resp) => {
    //     if( err ) return res.status(500).json({messgage:'something went wrong', err})

    //     res.status(200).json({message:'saved successfully removed'})
    // })

})

module.exports = router