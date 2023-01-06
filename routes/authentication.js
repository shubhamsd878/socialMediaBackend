const express = require('express')
const route = express.Router();
const userModel = require('../models/users')
const user = require("../routeFunctions//authentication_functions/authentication")



route.post('/signup',user.sign_up)  // definiton is given at authentication.js

// route.post('/login',user.login2);
route.post('/login',user.login) // definiton is given at authentication.js

route.get('/logout',user.logOut)   //definition is given at authentication.js
route.post('/updatePassword',user.updatePassword) 


module.exports = route;