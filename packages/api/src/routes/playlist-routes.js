const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { playlistController } = require("../controllers");

const playlistRouter = Router();

playlistRouter.post(
  "/api/playlists",
  authMiddleware,
  playlistController.createPlaylist,
);

playlistRouter.get("/api/playlists", playlistController.fetchPlaylists);

playlistRouter.patch(
  "/api/playlists/:id",
  playlistController.addTrackToPlaylist,
);

playlistRouter.delete(
  "/api/playlists/:id",
  playlistController.deleteTrackFromPlaylist,
);

playlistRouter.get("/api/playlists/:id", playlistController.fetchPlaylistById);
playlistRouter.delete("/api/playlists", playlistController.deletePlaylist);
playlistRouter.patch("/api/playlists", playlistController.updatePlaylist);

playlistRouter.get(
  "/api/me/playlists",
  authMiddleware,
  playlistController.fetchOwnPlaylists,
);

playlistRouter.patch(
  "/api/playlist/:id/follow",
  authMiddleware,
  playlistController.followPlaylist,
);

playlistRouter.get(
  "/api/me/playlist/follow",
  authMiddleware,
  playlistController.fetchFollowedPlaylists,
);

module.exports = {
  playlistRouter: playlistRouter,
};
