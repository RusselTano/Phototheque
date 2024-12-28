const router = require("express").Router();
const {
  createAlbumForm,
  createAlbum,
  listAlbum,
} = require("../controllers/album.controller");

router.get("/create", createAlbumForm);
router.post("/create", createAlbum);

router.get("/list", listAlbum);


module.exports = router;
