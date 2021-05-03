const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class PlaylistRepository {
  create(options) {
    return normalizeDBQuery(db.Playlist.create(options));
  }

  update(options) {
    return normalizeDBQuery(
      db.Playlist.updateOne({ _id: options._id }, options),
    );
  }

  find(query) {
    return normalizeDBQuery(db.Playlist.find(query, "-__v"));
  }

  findOne(query) {
    return normalizeDBQuery(db.Playlist.findOne(query, "-__v"));
  }

  findOneAndUpdate(query, data) {
    return normalizeDBQuery(db.Playlist.findOneAndUpdate(query, data, {}));
  }

  findById(id) {
    return normalizeDBQuery(db.Playlist.findById(id, "-__v"));
  }

  findByIdAndPopulate(id, options) {
    return normalizeDBQuery(db.Playlist.findById(id, "-__v").populate(options));
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.Playlist.findOneAndDelete(query));
  }
}

module.exports = new PlaylistRepository();
