const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      enum: [
        "English",
        "Hindi",
        "Marathi",
        "Kannada",
        "Telugu",
        "Tamil",
        "Malayalam",
        "Japanese",
      ],
      required: true,
    },
    genres: {
      type: [String],
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Romance",
        "Thriller",
        "Sci-Fi",
        "Animation",
        "Adventure",
        "Family",
        "Fantasy",
        "History",
        "Mystery",
        "War",
        "Sports",
      ],
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
