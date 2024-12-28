const router = require("express").Router();
const albumRoutes = require("./album.routes");

router.use("/album", albumRoutes)

module.exports = router;