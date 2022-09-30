const router = require("express").Router()   
let postSchema = require('../models/posts')
const fs = require('fs')
const formidable = require('express-formidable')

router.use(formidable({
    multiples:true
}))

router.post('/', (req, res) =>{
    
    try {
        if( !req.files.postImage ){
            return res.status(501).json({message : "upload all files"})
        }
        else{
            console.log("post route active")
            var post = new postSchema
            console.log("post route active")
            
            const file = req.files.postImage
            // typeof file 
            console.log(typeof file)
            // console.log(file)
            // console.log(file.path)
            // console.log(file.type)

            var img = fs.readFileSync(file.path)
            var binary_img = img.toString('base64')

            var final_img = {
                file_name: file.name,
                data : binary_img,
                content_type : file.type
            }

            post.file = final_img



            // post.file = file

            post.save(function(err, Person){
                if(err){
                    console.log('database error', err)
                    return res.status(501).json({message: "Database error", type: "error"});
                }
                else{
                    console.log('saved successfully')
                    return res.status(200).json({message: " Successfully uploaded", type: "Success"});
                }
             });

        }

    } catch (error) {
        console.log("something went wrong" + error)
    }

} )

module.exports = router