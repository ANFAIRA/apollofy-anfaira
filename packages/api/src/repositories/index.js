const trackRepository = require("./track-repository");
const UserRepository = require("./user-repository");
const PlaylistRepository = require("./playlist-repository");
const GenreRepository = require("./genre-repository");

module.exports = {
  UserRepo: UserRepository,
  TrackRepo: trackRepository,
  PlaylistRepo: PlaylistRepository,
  GenreRepo: GenreRepository,
};
