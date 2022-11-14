const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

//Experiences routes
const experienceRoutes = require("./experience.routes")
router.use("/experiences", experienceRoutes)

// Places routes
const placesRoutes = require("./places.routes")
router.use("/places", placesRoutes)

const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

//Itinerary routes
const itineraryRoutes = require("./itinerary.routes")
router.use("/itinerary", itineraryRoutes)




module.exports = router;
