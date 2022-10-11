const router = require("express").Router()
let postSchema = require('../models/posts')
const fs = require('fs')
const formidable = require('express-formidable')
const { nextTick } = require("process")
const { default: mongoose } = require("mongoose")

router.use(formidable({
    multiples: true
}))


router.post("/add", (req, res, next) => {
    if (req.files.file|| req.fields.desc) {
        var img = fs.readFileSync(req.files.file.path,"base64")
        let post = new postSchema({
            uid:"raju",
            pid:"raju123",
            file:img,
            desc:req.fields.desc,
        });
        post.save((err, data) => {
            if (err) {
                next(err)
            }
            else {
                res.send(data)
            }
        })


    }
    else {
        next(err);
    }
})

router.get("/fetch", (req, res) => {
    postSchema.findOne({}, (err, data) => {
        if (err) console.log(err);
        else {
            var img = new Buffer.from(data.file,"base64");
            fs.writeFileSync('max.png',img)
            res.send({
                img:img,
                desc:data.desc
            })
        }
    })

})

module.exports = router