const router = require("express").Router();
const albumRoutes = require("./album.routes");

router.use("/album", albumRoutes);

router.get("/", async (req, res) => {
  res.render("index");
});

module.exports = router;
