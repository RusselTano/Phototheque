const express = require("express");
const path = require("path");
const index = require("./routes");
const dotenv = require("dotenv")
const app = express();
const mongoose = require("mongoose");

// charger les variable d'environnement
dotenv.config();

// connexion a la base de donnee
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err.message));

// template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

//pour les formulaires envoyer en post au format json
app.use(express.json());

// pour le traitement des encodages url
app.use(express.urlencoded({ extended: false }));

// route de base
app.use(index);

// middleware de gestion des erreurs serveur
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

// lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})