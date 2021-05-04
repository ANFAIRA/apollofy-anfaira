const userController = require("./user-controller");
const trackController = require("./track-controller");
const playlistController = require("./playlist-controller");
const trackPlaybackController = require("./track-playback-controller");
const genreController = require("./genre-controller");

module.exports = {
  userController: userController,
  trackController: trackController,
  playlistController: playlistController,
  trackPlaybackController: trackPlaybackController,
  genreController: genreController,
};
