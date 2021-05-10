const songRepository = require("./song-repository");
const UserRepository = require("./user-repository");
const PlaylistRepository = require("./playlist-repository");
const GenreRepository = require("./genre-repository");
const SongPlaybackRepo = require("./song-playback-repository");

module.exports = {
  UserRepo: UserRepository,
  SongRepo: songRepository,
  PlaylistRepo: PlaylistRepository,
  GenreRepo: GenreRepository,
  SongPlaybackRepo: SongPlaybackRepo,
};
