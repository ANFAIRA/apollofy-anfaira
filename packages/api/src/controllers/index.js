const userController = require("./user-controller");
const songController = require("./song-controller");
const playlistController = require("./playlist-controller");
const songPlaybackController = require("./song-playback-controller");
const genreController = require("./genre-controller");
const genrePlaybackController = require("./genre-stats-controller");

module.exports = {
  userController: userController,
  songController: songController,
  playlistController: playlistController,
  songPlaybackController: songPlaybackController,
  genreController: genreController,
  genrePlaybackController: genrePlaybackController,
};
