const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, movieController.addMovie);
router.get("/", movieController.getAllMovies);
router.get("/:_id", movieController.getMovieById);
//router.delete("/:_id", verifyToken, movieController.deleteMovie);

module.exports = router;
