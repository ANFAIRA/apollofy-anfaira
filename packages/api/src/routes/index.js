const { userRouter } = require("./user-routes");
const { songRouter } = require("./song-routes");
const { playlistRouter } = require("./playlist-routes");
const { genreRouter } = require("./genre-routes");

module.exports = {
  userRouter: userRouter,
  songRouter: songRouter,
  playlistRouter: playlistRouter,
  genreRouter: genreRouter,
};
