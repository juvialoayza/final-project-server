const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//Experiences routes
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const experienceRoutes = require("./experience.routes")
router.use("/experiences", experienceRoutes)




module.exports = router;
