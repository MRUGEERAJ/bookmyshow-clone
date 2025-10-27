const { validationResult } = require("express-validator");
const Movie = require("../models/Movie");

exports.addMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    title,
    description,
    posterUrl,
    languages,
    genres,
    releaseDate,
    duration,
    rating,
  } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }
  if (!posterUrl) {
    return res.status(400).json({ message: "Poster URL is required" });
  }
  if (!languages || languages.length === 0) {
    return res.status(400).json({ message: "Languages are required" });
  }
  if (!genres || genres.length === 0) {
    return res.status(400).json({ message: "Genres are required" });
  }
  if (!releaseDate) {
    return res.status(400).json({ message: "Release date is required" });
  }
  if (!duration) {
    return res.status(400).json({ message: "Duration is required" });
  }
  if (!rating) {
    return res.status(400).json({ message: "Rating is required" });
  }
  try {
    const movie = new Movie({
      title,
      description,
      posterUrl,
      languages,
      genres,
      releaseDate,
      duration,
      rating,
    });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ releaseDate: -1 });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params._id).select("-__v");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/** Delete a movie (admin functionality for later) */
//export const deleteMovie = async (req, res) => {
//  try {
//    const movie = await Movie.findByIdAndDelete(req.params.id);
//    if (!movie) return res.status(404).json({ message: "Movie not found" });
//    res.json({ message: "Movie deleted successfully" });
//  } catch (err) {
//    res.status(500).json({ message: err.message });
//  }
//};
