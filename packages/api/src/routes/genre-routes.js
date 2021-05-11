const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { genreController, genrePlaybackController } = require("../controllers");

const genreRouter = Router();

genreRouter.get("/api/genres/popular", genrePlaybackController.fetchStats);

genreRouter.post(
  "/api/genres",
  // authMiddleware,
  genreController.createGenre,
);
genreRouter.patch(
  "/api/genres",
  // authMiddleware,
  genreController.addSongToGenre,
);
genreRouter.get("/api/genres", genreController.fetchGenres);
genreRouter.get("/api/genres/:id", genreController.fetchGenreById);
genreRouter.get(
  "/api/genres/:name",
  // authMiddleware,
  genreController.fetchGenreByName,
);

genreRouter.post("/songs/:id/playback", genrePlaybackController.addGenresStats);

module.exports = {
  genreRouter: genreRouter,
};
