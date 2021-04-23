const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.get("/api/tracks", trackController.getAllSongs);
trackRouter.post("/api/tracks", authMiddleware, trackController.createTrack);
trackRouter.patch("/api/tracks", trackController.updateTrack);

module.exports = {
  trackRouter: trackRouter,
};
