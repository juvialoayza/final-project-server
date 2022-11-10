const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//Experiences routes
const experienceRoutes = require("./experience.routes")
router.use("/experiences", experienceRoutes)




module.exports = router;
