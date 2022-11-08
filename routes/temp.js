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
            console.log(req.files)
            console.log('upload all files')
            return res.status(501).json({message : "upload all files"})
        }
        else{
            console.log("post route active")
            var post = new postSchema
            console.log("post route active")
            
            const file = req.files.postImage

            // console.log(file)
            // console.log(file.path)
            // console.log(file.type)

//2 ways to save file: 1 to save - name, binary, mimeType
                    // 2 to save - whole file as in binary
//================================================================================

            var img = fs.readFileSync(file.path)
            var binary_img = img.toString('base64')

            var final_img = {
                file_name: file.name,
                data : binary_img,
                content_type : file.type
            }

            post.file = final_img

//================================================================================== 
            // ****Not working*****
            //Saving whole file at once 
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