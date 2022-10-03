const { Schema } = require('mongoose');
const userModel = require('../../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var session = require('express-session')
const mongoose = require('mongoose')


const sign_up= (req,res)=>{

   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    var data = new userModel({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        password:hash,
    })
    data.save( (err,result)=>{
        if(err) console.log(err);
        else
        {
            res.send(result)
        }
    
    })
    

})


}

function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else next('route')
  }
  

const login = (req,res)=>{
 userModel.findOne( {'name':req.body.username} ,(err,result)=>{
    if(err)
    {

        console.log(err);
        res.send(err)
    }
    else
    {
        bcrypt.compare(req.body.password, result.password).then(function(result) {
            if(result)
            {
                req.session.user = req.body.username;
                res.redirect('/');
            }
            else{
                res.send("please login with correct username and password");
            }
            
        }).catch((err)=>{
            console.log(err);
            res.redirect("/authentication/signup");
        });
    }
 })
}

const login2 = (req,res)=>{
    req.session.user = req.body.username
    req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('/')
      })

}
const logOut=(req,res)=>{
        req.session.user = null;
        req.session.regenerate( (err)=>{
            if (err) next('err')
            res.redirect('/')
        })
     
}

const verifier= (req,res)=>{
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
