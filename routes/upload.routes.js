const router = require("express").Router();
const uploader = require("../middlewares/cloudinary")

router.post("/", uploader.single("image"),(req, res, next)=> {
    if(req.file === undefined){
    res.status(400).json("Failed to load content")
    return
}
console.log(req.file.path)
res.status(200).json({image:req.file.path})
})


module.exports = router;