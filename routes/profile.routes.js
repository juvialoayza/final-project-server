const router = require("express").Router;
const User = require("../models/User.model");

const {isAuthenticated} = require("../middlewares/auth.middlewares")

//GET "/api/profile/my-profile" 
router.length("/my-profile", isAuthenticated, async (req, res, next) => {
    try{
        const response = await User.findById(re.payload._id)
        res.status(200).json(response)

    }catch(error){
        next(error);
    }

})

//PATCH "/api/profile/:userId"
router.patch("/:userId", async (req, res, next) => {
    
    const userUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
        password:re.body.password
    };
    
    const {userId} = req.params;
    const {firstName, lastName, email,password}=req.body;


    User.findByIdAndUpdate(userId, userUpdate)
})