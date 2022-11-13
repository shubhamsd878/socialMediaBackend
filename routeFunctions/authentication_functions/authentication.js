const { Schema } = require('mongoose');
const userModel = require('../../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var session = require('express-session')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

const jwt_secret = 'this is vipul, shubham secret'


const sign_up = (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        var data = new userModel({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })

        data.save((err, result) => {
            if (err) {
                console.log(err);
                res.status(404).json({ status: 404, message: 'something went wrong' })
            }
            else {
                console.log('name= ' + req.body.name + ", email: " + req.body.email + ', password: ' + req.body.password)
                res.status(200).json({ status: 200, message: result })
            }

        })


    })


}

function isAuthenticated(req, res, next) {
    if (req.session.user) next()
    else next('route')
}


const login = (req, res) => {
    const {email, password } = req.body;
    // console.log('email: ' + req.body.email + '\npassword: ' + req.body.password)
    console.log('email: ' + email + '\npassword: ' + password)

    userModel.findOne({ 'email': req.body.email }, (err, result) => {
        if (err) {
            res.status(404).json({ status: 404, message: 'something went wrong' })
            console.log(err);
        }
        else {
            if (result) {

                bcrypt.compare(req.body.password, result.password).then(function (resu) {
                    if (resu) {
                        const data = {
                            id: result._id,
                            password: result.password
                        }
                        console.log(data)

                        const token = jwt.sign(data, jwt_secret)
                        console.log('token is: ',token )

                        res.status(200).json({ status: 200, message:'succesful sign in', token, uid: result._id})

                        // req.session.user = req.body.username;
                        // const data = 

                        // res.redirect('/');
                    }
                    else {
                        res.status(401).json({ status: 401, message: "please login with correct username and password" });
                    }

                }).catch((err) => {
                    console.log(err);
                    res.redirect("/authentication/signup");     // ???
                });

            }
            else {
                console.log('user not found with email: ' + req.body.email)
                res.status(400).json({ message: 'user not found' })
            }
        }
    })
}

const login2 = (req, res) => {
    req.session.user = req.body.username
    req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('/')
    })

}
const logOut = (req, res) => {
    req.session.user = null;
    req.session.regenerate((err) => {
        if (err) next('err')
        res.redirect('/')
    })

}

const verifier = (req, res) => {
    res.send(" show me your details..")
}

module.exports = {
    sign_up,
    login,
    logOut,
    isAuthenticated,
    login2,
    verifier
}
