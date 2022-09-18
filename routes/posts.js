const express = require('express');
const route = require('../routeFunctions/posts/posts')

const posts = express.Router();


posts.post('/add',route.add)


module.exports= posts;