const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { playlistController } = require("../controllers");

const playlistRouter = Router();

playlistRouter.post(
  "/api/playlists",
  authMiddleware,
  playlistController.createPlaylist,
);

playlistRouter.get(
  "/api/playlists",
  // authMiddleware,
  playlistController.fetchPlaylists,
);

playlistRouter.patch(
  "/api/playlists/:id",
  playlistController.addTrackToPlaylist,
);

playlistRouter.get("/api/playlists/:id", playlistController.fetchPlaylistById);

playlistRouter.get(
  "/api/me/playlists",
  authMiddleware,
  playlistController.fetchOwnPlaylists,
);

module.exports = {
  playlistRouter: playlistRouter,
};
