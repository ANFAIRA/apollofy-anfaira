const Router = require("express").Router;

const { genreController, genrePlaybackController } = require("../controllers");

const genreRouter = Router();

genreRouter.get("/api/genres/popular", genrePlaybackController.fetchStats);

genreRouter.post("/api/genres", genreController.createGenre);
genreRouter.patch("/api/genres", genreController.addSongToGenre);
genreRouter.get("/api/genres", genreController.fetchGenres);
genreRouter.delete("/api/genres", genreController.deleteSongFromGenre);
genreRouter.get("/api/genres/:id", genreController.fetchGenreById);
genreRouter.get("/api/genres/:name", genreController.fetchGenreByName);

module.exports = {
  genreRouter: genreRouter,
};
