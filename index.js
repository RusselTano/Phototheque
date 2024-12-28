const express = require("express");
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


// route de base
app.use(index);

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})