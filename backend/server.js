const express = require("express"); // Importerer Express framework til server
const mongoose = require("mongoose"); // Importerer Mongoose til MongoDB
const cors = require("cors"); // Importerer CORS Middleware
require("dotenv").config(); // Loader miljøvariabler fra .env

const MyMovie = require("./models/my_movies"); // Importerer MyMovie model
const { parse } = require("dotenv");
const app = express();

// Middleware
app.use(cors()); // Aktiverer CORS
app.use(express.json()); // Aktiverer JSON parsing

// MongoDB connection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample_mflix model (read-only)
const movieSchema = new mongoose.Schema({}, { strict: false });
const Movie = mongoose.model("Movie", movieSchema, "movies");
