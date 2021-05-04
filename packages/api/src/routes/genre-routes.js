const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { genreController } = require("../controllers");

const genreRouter = Router();

genreRouter.post(
  "/api/genres",
  // authMiddleware,
  genreController.createGenre,
);
genreRouter.patch(
  "/api/genres",
  // authMiddleware,
  genreController.addTrackToGenre,
);
genreRouter.get("/api/genres", authMiddleware, genreController.fetchGenres);
//genreRouter.get("/genres/:id", authMiddleware, genreController.fetchGenreById);
genreRouter.get(
  "/api/genres/:name",
  authMiddleware,
  genreController.fetchGenreByName,
);

module.exports = {
  genreRouter: genreRouter,
};
