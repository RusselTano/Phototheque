const Album = require("../models/album.model");
const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");

const createAlbumForm = (req, res) => {
  res.render("album-form", {
    title: "Create Album",
  });
};
const createAlbum = async (req, res) => {
  try {
    const album = await Album.create({
      title: req.body.title,
    });
    res.redirect(`/album/${album._id}`);
  } catch (err) {
    res.render("album-form", {
      errorMessage: err.message,
      title: "Create Album",
    });
  }
};
const albumList = async (req, res) => {
  const albums = await Album.find({});
  res.render("album-list", {
    title: "Albums List",
    albums,
  });
};

const albumDetail = async (req, res) => {
  const album = await Album.findById(req.params.id);
  res.render("album", {
    title: album.title,
    album,
    errorMessage: req.query.errorMessage,
  });
};

const addImage = async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);
  if (!req.files?.image) {
    res.redirect(`/album/${album._id}?errorMessage=Veuillez choisir une image`);
    return;
  }

  if (req.files.image.size > 1000000) {
    res.redirect(
      `/album/${album._id}?errorMessage=La taille de l'image doit faire moins de 1Mo`
    );
    return;
  }

  if (
    req.files.image.mimetype !== "image/jpeg" &&
    req.files.image.mimetype !== "image/png"
  ) {
    res.redirect(
      `/album/${album._id}?errorMessage=Le format de l'image doit etre jpeg ou png`
    );
    return;
  }
  const imageName = req.files.image.name;
  const folderPath = path.join(__dirname, "../public/uploads", idAlbum);

  fs.mkdirSync(folderPath, { recursive: true });

  const localPath = path.join(folderPath, imageName);
  await req.files.image.mv(localPath);

  album.images.push(imageName);
  await album.save();
  res.redirect(`/album/${album._id}`);
};

const deleteImage = async (req, res) => {
  const idAlbum = req.params.id;
  const index = req.params.index;
  const album = await Album.findById(idAlbum);
  const imageName = album.images[index];
  const imagePath = path.join(
    __dirname,
    "../public/uploads",
    idAlbum,
    imageName
  );

  fs.unlinkSync(imagePath);
  album.images.splice(index, 1);
  await album.save();
  res.redirect(`/album/${album._id}`);
};

const deleteAlbum = async (req, res) => {
  const idAlbum = req.params.id;
  await Album.findByIdAndDelete(idAlbum);
  rimraf.sync(path.join(__dirname, "../public/uploads", idAlbum));
  res.redirect("/album/list");
};

module.exports = {
  createAlbumForm,
  createAlbum,
  albumList,
  albumDetail,
  addImage,
  deleteImage,
  deleteAlbum,
};
