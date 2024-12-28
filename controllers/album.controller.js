const Album = require("../models/album.model");

const createAlbumForm = (req, res) => {
  res.render("album-form", {
    title: "Create Album",
  });
};
const createAlbum = async (req, res) => {
  console.log(req.body);
  await Album.create({
    title: req.body.title,
    images: req.body.images,
  });
  res.redirect("/album/list");
};
const listAlbum = (req, res) => {
  res.render("album-list");
};

module.exports = {
  createAlbumForm,
  createAlbum,
  listAlbum,
};
