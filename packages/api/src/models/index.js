const UserModel = require("./user-model");
const TrackModel = require("./track-model");
const PlaylistModel = require("./playlist-model");
const GenreModel = require("./genre-model");
const GenrePlaybackModel = require("./data-analysis/genre-playback-model");
const MonthlyGenrePlaybackModel = require("./data-analysis/monthly-genre-playback-model");
const TrackPlaybackModel = require("./data-analysis/track-playback-model");
const PageRequestModel = require("./data-analysis/page-request-model");
const MonthlyTrackPlaybackModel = require("./data-analysis/monthly-track-playback-model");
const MonthlyPageRequestModel = require("./data-analysis/monthly-page-request-model");

module.exports = {
  User: UserModel,
  Track: TrackModel,
  Playlist: PlaylistModel,
  Genre: GenreModel,
  GenrePlayback: GenrePlaybackModel,
  MonthlyGenrePlayback: MonthlyGenrePlaybackModel,
  TrackPlayback: TrackPlaybackModel,
  PageRequest: PageRequestModel,
  MonthlyTrackPlayback: MonthlyTrackPlaybackModel,
  MonthlyPageRequest: MonthlyPageRequestModel,
};
