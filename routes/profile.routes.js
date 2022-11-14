const router = require("express").Router();
const User = require("../models/User.model");

const isAuthenticated  = require ("../middlewares/auth.middlewares");

//GET "/api/profile/my-profile" 
router.get("/my-profile", isAuthenticated, async (req, res, next) => {
    try {
        const response = await User.findById(req.payload._id)
        res.status(200).json(response)

    } catch (error) {
        next(error);
    }

})

//PATCH "/api/profile/:userId/edit"
router.patch("/:userId/edit", isAuthenticated, async (req, res, next) => {
    console.log(req.params.userId)
    const userUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    try {
        await User.findByIdAndUpdate(req.params.userId, userUpdate)

        res.status(200).json("Updated profile")
    } catch (error) {
        next(error)
    }
})

//POST "/api/profile/:userId/delete"
router.post("/:userId/delete", isAuthenticated, async (req, res, next)=> {
    try{
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("Deleted profile")
    } catch(error) {
        next(error)
    }
})

module.exports = router;