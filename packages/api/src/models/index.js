const UserModel = require("./user-model");
const SongModel = require("./song-model");
const PlaylistModel = require("./playlist-model");
const GenreModel = require("./genre-model");
const GenreStatistics = require("./data-analysis/genre-playback-model");
const MonthlyGenrePlaybackModel = require("./data-analysis/monthly-genre-playback-model");
const SongPlaybackModel = require("./data-analysis/song-playback-model");
const PageRequestModel = require("./data-analysis/page-request-model");
const MonthlySongPlaybackModel = require("./data-analysis/monthly-song-playback-model");
const MonthlyPageRequestModel = require("./data-analysis/monthly-page-request-model");

module.exports = {
  User: UserModel,
  Song: SongModel,
  Playlist: PlaylistModel,
  Genre: GenreModel,
  GenreStatistics: GenreStatistics,
  MonthlyGenrePlayback: MonthlyGenrePlaybackModel,
  SongPlayback: SongPlaybackModel,
  PageRequest: PageRequestModel,
  MonthlySongPlayback: MonthlySongPlaybackModel,
  MonthlyPageRequest: MonthlyPageRequestModel,
};
