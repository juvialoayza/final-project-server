const router = require("express").Router();
const Experience = require("../models/Experience.model")

//GET "/api/experiences/experienceList" => Ruta para obtener todas las experiencias de la BD
router.get("/experienceList", async (req, res, next) => {
    try {
        const response = await Experience.find().select("title", "place")
        res.status(200).json(response)
    } catch(error) {
        next(error)
    }
})

//POST "/api/experiences/experienceCreate" => REcibe datos para crear una nueva experiencia en la BD
router.post("/experienceCreate", async (req, res, next) => {
    console.log(req.body)

    const newExperience = {
        name: req.body.name,
        description: req.body.description,
        place: req.body.place,
        price: req.body.price,
        date: req.body.date
    }

    try {
        const response = await Experience.create(newExperience)
        console.log
        res.status(201).json("new element created in DB")
    } catch(error) {
        next(error)
    }
})

module.exports = router