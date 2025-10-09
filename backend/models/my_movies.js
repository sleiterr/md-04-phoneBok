const mongoose = require("mongoose");

// Definerer schema for my_movies collection med validering
const myMovieSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Datatype: tekst
      required: [true, "Title er påkrævet"], // Feltet skal udfyldes
      minlength: [1, "Titel skal være mindst 1 tegn"], // Minimum længde
    },

    description: {
      type: String, // Datatype: tekst
      required: [true, "Description er påkrævet"], // Feltet skal udfyldes
      minlength: [20, "Titel skal være mindst 20 tegn"], // Minimum længde
    },

    year: {
      type: Number, // Datatype: tal
      required: [true, "År er påkrævet"], // Feltet skal udfyldes
      min: [1920, "Film kan ikke være fra før 1920"], // Mindste år
      max: [2030, "Film kan ikke ligge for langt ude i fremtiden"], // Maksimum år
    },

    rated: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17", "Not Rated"], // Kun disse værdier tilladt
      default: "Not Rated",
    },

    rating: {
      type: Number,
      required: [true, "Rating er påkrævet"],
      min: [1, "Minimum 1 tegn"],
      max: [10, "Maksimum 10"],
    },

    runtime: {
      type: Number, // Datatype: tal (varighed i minutter)
      min: [1, "Film skal have en varighed på mindst 1 minut"], // Minimum varighed
    },

    genres: {
      type: [String], // Array af tekst-strenge
      validate: {
        validator: (arr) => arr.length > 0, // Minimum 1 genre krævet
        message: "Der skal være mindst 1 genre", // Fejlmeddelelse hvis validator fejler
      },
    },

    poster: {
      type: String, // URL til filmens poster
      default: "", // Hvis ingen URL, sættes til at være tom
    },
  },
  { timestamps: true }
); // Timestamps tilføjer automatisk createdAt og updatedAt

// Eksporterer modellen, som vi kan bruge i vores server til CRUD
module.exports = mongoose.model("MyMovie", myMovieSchema, "my_movies");
