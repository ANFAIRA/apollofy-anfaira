const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.get("/api/tracks", trackController.getAllSongs);
trackRouter.post("/api/tracks", authMiddleware, trackController.createTrack);
trackRouter.patch("/api/tracks", trackController.updateTrack);
trackRouter.get("/api/me/tracks", authMiddleware, trackController.getMeSongs);
trackRouter.patch("/tracks/:id/like", authMiddleware, trackController.likeSong);

module.exports = {
  trackRouter: trackRouter,
};
