const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.get("/api/tracks", trackController.getAllSongs);
trackRouter.post("/tracks", authMiddleware, trackController.createTrack);
trackRouter.patch("/tracks/:id/like", authMiddleware, trackController.likeSong);

module.exports = {
  trackRouter: trackRouter,
};
