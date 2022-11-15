const router = require('express').Router()
const likes = require('../models/likes')
const jwt_secret = 'this is vipul, shubham secret'

// const totalLikes = require('../models/totalLikes')
const jwt = require('jsonwebtoken')


router.post('/', async (req, res) => {
    const pid = req.headers.pid
    const auth = req.headers.authtoken

    if (!auth) {
        console.log('no auth token from ')
        return res.status(500).json({ message: "Invalid User" })
    }

    const decoded = jwt.decode(auth, jwt_secret)
    const uid = decoded.id

    if (!uid) return res.status(400).json({ message: 'non uid' })

    // let fetchtotalLikes = await likes.findById(pid, {totalLikes}).
    // console.log('hii from likes')
    // let fetchTotalLikes = await likes.findById(pid).
    //     catch(err => res.status(500).json({ message: 'something went wrong', err }))

    // console.log('fetchTotalLikes: ', fetchTotalLikes)



    // var nowLikes

    // if(fetchTotalLikes)
    // {if(fetchTotalLikes.totalLikes){ 
    //     nowLikes= fetchTotalLikes.totalLikes
    // }
    // else
    //     nowLikes = 0
    // }
    // else
    //     nowLikes = 0

    // console.log('now likes: ', nowLikes)

    likes.findByIdAndUpdate(pid, {
        // totalLikes: nowLikes + 1,
        $addToSet: {
            users: uid
        }
    }, { upsert: true }, (err, resu) => {
        if (err) return res.status(500).json({ message: 'something went wrong', err })
        
        return res.status(200).json({ message: 'like successful' })
    })
    

})


router.get('/', (req, res) => {
    const pid = req.headers.pid

    likes.findById(pid, (err, resp) => {
        if(err) return res.status(500).json({ message: 'something went wrong', err })

        console.log('resp: ', resp)
        if( resp )
            return res.status(200).json({message: 'like fetch successful', totalLikes: resp.users.length, users: resp.users})
        else 
            return res.status(200).json({message: 'like fetch successful', totalLikes: 0, users: []})
        
    })
})

module.exports = router