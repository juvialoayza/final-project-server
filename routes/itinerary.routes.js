const router = require("express").Router();
const Itinerary = require("../models/Itinerary.model")

//POST "/itinerary" => Ruta para crear nuevo itinerario en la BD
router.post("/", async (req, res, next) => {
    console.log(req.body)
    const newItineray = {
        place: req.body.place,
        experience: req.body.experience,
        date: req.body.date,
        budget: req.body.budget,
        creator: req.body.creator
    }

    try {
      const response = await Itinerary.create(newItineray)
      res.status(201).json("Itinerario creado en la BD")
    } catch(error) {
        next(error)
    }
})

//PATCH "/:itineraryId" => Ruta para editar un itinerario de la BD
router.patch("/:itinerayId", async (req, res, next) => {
    const itineraryUpdate = {
        place: req.body.place,
        experience: req.body.place,
        date: req.body.date,
        budget: req.body.budget,
        creator: req.body.creator
    }

    try {
      await Itinerary.findByIdAndUpdate(req.params.itinerayId.itineraryUpdate)
      res.status(200).json("Itinerario actualizado")
    } catch(error) {
        next(error)
    }
})


module.exports = router;