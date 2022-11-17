const router = require('express').Router()
const jwt = require('jsonwebtoken')
// const formidable = require('express-formidable')

const comments = require('../models/comments')

const jwt_secret = 'this is vipul, shubham secret'

// router.use(formidable({
//     multiples: true
// }))

router.get('/', async (req, res) => {
    const pid = req.headers.pid

    let result = await comments.find({pid: pid}, {}, {sort: {date: -1}} )
        .populate('uid', '_id name')

    res.status(200).json({message:'success', response: result})
    
})


router.post('/', (req, res) => {
    const pid = req.headers.pid
    const auth = req.headers.authtoken

    if(!auth){
        console.log('no auth token')
        return res.status(500).json({message : "Invalid User"})
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    if( !uid ) return res.status(400).json({message: 'no uid'})
    if( !pid ) return res.status(400).json({message: 'no pid'})

    // const textComment = req.body.comment;  
    const textComment = req.headers.comment;

    let date = new Date()
    console.log(date)
    
    const newComment = comments({
        pid: pid,
        uid: uid,
        comment: textComment,
        date: date
    })
    

    newComment.save( (err, resp) => {
        if( err) return res.status(500).json({messge: 'something went wrong', err})

        console.log('resp: ', resp)
        return res.status(200).json({message: 'comment added successfully'})
    })

})


module.exports = router