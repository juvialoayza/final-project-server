const router = require("express").Router();
const Experience = require("../models/Experience.model")
const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const categoryList = require("../utils/categoryList")
const placesList = require("../utils/placesList")


//GET "/api/experiences" => Ruta para obtener todas las experiencias de la BD
router.get("/", async (req, res, next) => {
    try {
        const response = await Experience.find()
        res.status(200).json(response)
    } catch(error) {
        next(error)
    }
})

//GET "/api/experiences/places" => Enviar información al FE sobre lista de lugares pertenecientes el modelo Experience
router.get("/places", isAuthenticated, (req, res, next) => {
    // try {
    //   const response = await Experience.find()
    //   res.status(200).json("Enviando info de lugares", placesList)
    // } catch(error) {
    //     next(error)
    // }
    res.status(200).json({
        placesList
    })
})

//GET "/api/experiences/experienceCreate" => Envía datos de lista de lugares al FE
router.get("/experienceCreate", isAuthenticated, async (req, res, next) => {
    try {
        const response = await Experience.find()
        res.status(200).json("Esta es la respuesta", response)
    } catch(error) {
        next(error)
    }
})

//POST "/api/experiences/experienceCreate" => REcibe datos para crear una nueva experiencia en la BD
router.post("/experienceCreate", isAuthenticated, async (req, res, next) => {
    // console.log(req.body)

    const newExperience = {
        name: req.body.name,
        description: req.body.description,
        place: req.body.place,
        price: req.body.price,
        date: req.body.date,
        creator: req.payload._id
        // photoExperience: req.file.path
    }
    
    try {
        const response = await Experience.create(newExperience)
     
        res.status(201).json("new element created in DB")
    } catch(error) {
        next(error)
    }
})

//PATH "/api/experiences/:experienceId" => Edita una experiencia de la BD por su id
router.patch("/:experienceId", isAuthenticated, async (req, res, next) => {
    const experienceUpdate = {
        name: req.body.name,
        description: req.body.description,
        place: req.body.place,
        price: req.body.price,
        date: req.body.date,
        creator: req.payload._id,
        photoExperience: req.file.path
    }

    try {
        await Experience.findByIdAndUpdate(req.params.experienceId, experienceUpdate)
        res.status(200).json("Experiencia actualizada")
    } catch(error) {
        next(error)
    }
})

//GET "/api/experiences/:experienceId" => Buscar y mostrar detalles de una experiencia por su id
router.get("/:experienceId", isAuthenticated, async (req, res, next) => {
    try {
      const response = await Experience.findById(req.params.experienceId).populate("creator")
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

//PATCH "/api/experiences/favorites/:experienceId" => Agregar experiencias a la propiedad favoritos del modelo usuario
router.patch("/favorites/:experienceId", isAuthenticated, async (req, res, next) => {
    try {
    //   console.log(req.payload)
      await User.findByIdAndUpdate(req.payload._id, {
        $addToSet: {favorites: req.params.experienceId},
      })
      res.status(200).json("Experiencia agregada a favoritos")
    } catch(error) {
        next(error)
    }
})

//DELETE "/api/experiences/favorites/:experienceId" => Eliminar favoritos del modelo de usuario
router.delete("/favorites/:experienceId", isAuthenticated, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.payload._id, {
        $pull: {favorites: req.params.experienceId},
    })
    res.status(200).json("Experiencia borrada de favoritos")
  }catch(error) {
    next(error)
  }
})

// //GET "api/experiences/favorites" => Mostrar lista de favoritos del usuario
// router.get("/my-favorites", isAuthenticated, async (req, res, next) => {
    
//     try {
    
//       const response = await User.findById(req.payload._id)
//       console.log(response)
//       res.status(200).json("Mostrando tu lista de favoritos")
      
//     } catch(error) {
//         next(error)
//     }
// })





module.exports = router