// Shubham - most of done, email search remain, try to search in both simultaneaously
const router = require('express').Router()
const users = require('../models/users')

router.get('/', (req, res)=> {

    let a = req.body.query
    // users.find( { name: a } || { email: a}, (err, response)=> {
    
    users.find( { name: { $regex : new RegExp(a, "i") } } || { email: { $regex : new RegExp(a, "i") } }, (err, response)=> {
        if(err) return res.status(500).json({message:'something went wrong!', err})

        console.log('a: ', a)
        return res.status(200).json({ message: 'success', response })

    } )

})

module.exports = router