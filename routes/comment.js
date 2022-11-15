const router = require('express').Router()
const jwt = require('jsonwebtoken')
const comments = require('../models/comments')

const jwt_secret = 'this is vipul, shubham secret'


router.get('/', (req, res) => {
    const pid = req.headers.pid

    comments.find({pid: pid}, {}, {sort: {date: -1}},(err, resp) => {
        if(err) return res.status(500).json({message: 'something went wrong', err})

        res.status(200).json({message:'success', response: resp})
    })
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

    const textComment = req.body.comment;  
    
    const newComment = comments({
        pid: pid,
        uid: uid,
        comment: textComment
    })

    newComment.save( (err, resp) => {
        if( err) return res.status(500).json({messge: 'something went wrong', err})

        console.log('resp: ', resp)
        return res.status(200).json({message: 'comment added successfully'})
    })

})


module.exports = router