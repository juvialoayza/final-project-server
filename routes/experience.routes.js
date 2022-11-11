const router = require("express").Router();
const Experience = require("../models/Experience.model")

//GET "/api/experience" => Ruta para obtener todas las experiencias de la BD
router.get("/", async (req, res, next) => {
    try {
        const response = await Experience.find()
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

//PATH "/api/experiences/:experienceId" => Edita una experiencia de la BD por su id
router.patch("/:experienceId", async (req, res, next) => {
    const experienceUpdate = {
        name: req.body.name,
        description: req.body.description,
        place: req.body.place,
        price: req.body.price,
        date: req.body.date
    }

    try {
        await Experience.findByIdAndUpdate(req.params.experienceId, experienceUpdate)
        res.status(200).json("Experiencia actualizada")
    } catch(error) {
        next(error)
    }
})

//GET "/api/experiences/:experienceId" => Buscar datos de una experiencia en la BD por su id
router.get("/:experienceId", async (req, res, next) => {
    try {
      const response = await Experience.findById(req.params.experienceId)
      res.status(200).json(response)
    } catch(error) {
        next(error)
    }
})

//DELETE "/api/experiences/:experienceId" => Borra una experiencia de la BD por su id
router.delete("/:experienceId", async (req, res, next) => {
    try {
      await Experience.findByIdAndDelete(req.params.experienceId)
      res.status(200).json("Experiencia borrada")
    } catch(error) {
        next(error)
    }
})

module.exports = router