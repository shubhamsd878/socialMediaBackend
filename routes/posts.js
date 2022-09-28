const express = require('express');
const route = require('../routeFunctions/posts/posts')
const multer = require("multer")

const posts = express.Router();

const {GridFsStorage} = require('multer-gridfs-storage');
const url = 'mongodb://localhost:27017/socialMedia';


const storage = new GridFsStorage({ url });


const upload = multer({ storage });



posts.post('/add',upload.single('file'),route.add)


module.exports= posts;