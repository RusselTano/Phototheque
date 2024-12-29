const router = require("express").Router();
const {
  createAlbumForm,
  createAlbum,
  albumList,
  albumDetail,
  addImage,
  deleteImage,
  deleteAlbum,
} = require("../controllers/album.controller");

router.get("/create", createAlbumForm);
router.post("/create", createAlbum);


router.get("/list", albumList);
router.get("/:id", albumDetail);
router.post("/:id", addImage);

router.get("/:id/delete/:index", deleteImage);
router.get("/:id/delete", deleteAlbum);

module.exports = router;
