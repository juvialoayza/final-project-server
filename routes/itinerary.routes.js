const router = require("express").Router();
const Experience = require("../models/Experience.model");
const Itinerary = require("../models/Itinerary.model")
const isAuthenticated  = require ("../middlewares/auth.middlewares");

//POST "/itinerary" => Ruta para crear nuevo itinerario en la BD
router.post("/", isAuthenticated, async (req, res, next) => {
    console.log(req.body)
    const newItineray = {
        name: req.body.name,
        place: req.body.place,
        // experience: req.body.experience,
        date: req.body.date,
        budget: req.body.budget,
        creator: req.payload._id
    }

    try {
      const response = await Itinerary.create(newItineray, {
        $addToSet: {experience: req.body.experience}
      })
      res.status(201).json("Itinerario creado en la BD")
    } catch(error) {
        next(error)
    }
})

//PATCH "/:itineraryId" => Ruta para editar un itinerario de la BD
router.patch("/:itinerayId", async (req, res, next) => {
    const itineraryUpdate = {
        name: req.body.name,
        place: req.body.place,
        experience: req.body.place,
        date: req.body.date,
        budget: req.body.budget,
        creator: req.payload._id
    }

    try {
      await Itinerary.findByIdAndUpdate(req.params.itinerayId.itineraryUpdate)
      res.status(200).json("Itinerario actualizado")
    } catch(error) {
        next(error)
    }
})

//DELETE "/itinerary/:itineraryId" => Ruta para borrar un itinerario de la BD
router.delete("/:itineraryId", async (req, res, next) => {
    try {
      await Itinerary.findByIdAndDelete(req.params.itineraryId)
      res.status(200).json("Itinerario borrada")
    } catch(error) {
        next(error)
    }
})

//PATCH "/itinerary/add/:experienceId" => Ruta para agregar una experiencia a un itinerario 
router.post("/add/:experienceId", isAuthenticated, async (req, res, next) => {
    const {experienceId} = req.params
    const {experience} = req.body
    
    try {
    //  const currentExperience = await Experience.findById(experienceId)
     await Itinerary.create({
        $addToSet: {experience: experienceId},
     })
     res.status(200).json("Experiencia agregada al itinerario")
    } catch(error) {
        next(error)
    }
})


module.exports = router;