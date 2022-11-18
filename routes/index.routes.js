const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const experienceRoutes = require("./experience.routes")
router.use("/experiences", experienceRoutes)

const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

const itineraryRoutes = require("./itinerary.routes")
router.use("/itinerary", itineraryRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)


module.exports = router;
