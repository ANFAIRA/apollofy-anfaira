const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { songController, songPlaybackController } = require("../controllers");

const songRouter = Router();

songRouter.get("/api/songs", songController.getAllSongs);
songRouter.post("/api/songs", authMiddleware, songController.createSong);
songRouter.patch("/api/songs", songController.updateSong);
songRouter.delete("/api/songs", songController.deleteSong);
songRouter.get("/api/me/songs", authMiddleware, songController.getMeSongs);
songRouter.get(
  "/api/me/songs/liked",
  authMiddleware,
  songController.getLikedSongs,
);
songRouter.patch("/songs/:id/like", authMiddleware, songController.likeSong);
songRouter.post("/songs/:id/playback", songPlaybackController.addPlayback);
songRouter.delete(
  "/songs/:id/playback",
  songPlaybackController.deleteSongPlayback,
);
songRouter.delete(
  "/songs/:id/playback-monthly",
  songPlaybackController.deleteSongPlaybackMonthly,
);

songRouter.get(
  "/api/songs/popular",
  songPlaybackController.fetchMonthlyPlaybacks,
);
module.exports = {
  songRouter: songRouter,
};
