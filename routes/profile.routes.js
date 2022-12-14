const router = require("express").Router();
const User = require("../models/User.model");
const uploader = require("../middlewares/cloudinary.js")
const Itinerary = require("../models/Itinerary.model")

const {isAuthenticated} = require("../middlewares/auth.middlewares");
const Experience = require("../models/Experience.model");


//GET "/api/profile/my-profile" 
router.get("/my-profile", isAuthenticated, async (req, res, next) => {
    try {
        const response = await User.findById(req.payload._id).populate("favorites")
        console.log(response)
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }

})

//PATCH "/api/profile/:userId/edit"
router.patch("/:userId/edit", isAuthenticated, uploader.single("image"), async (req, res, next) => {
    // console.log(req.params.userId)
    const userUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        bioCreator: req.body.bioCreator,
        photoUser: req.body.photoUser
    };

    try {
        const response = await User.findByIdAndUpdate(req.payload._id, userUpdate)

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

//POST "/api/profile/:userId/delete"
router.post("/:userId/delete", isAuthenticated, async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("Deleted profile")
    } catch (error) {
        next(error)
    }
})

//GET "/api/profile/my-profile/my-itinerary" => Mostrar itinerarios creados por el usuario
router.get("/my-profile/my-itinerary", isAuthenticated, async (req, res, next) => {
    try {
        const response = await Itinerary.find({ creator: req.payload._id }).populate("creator")
        console.log(response)
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }

})

//GET "/api/profile/my-experiences" => Ruta para mostrar las experiencias que ha creado un usuario Admin
router.get("/my-experiences", isAuthenticated, async (req, res, next) => {
    try {
        const response = await Experience.find({ creator: req.payload._id })
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

module.exports = router;