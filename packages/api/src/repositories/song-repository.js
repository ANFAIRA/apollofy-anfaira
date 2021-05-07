const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class SongRepository {
  create(query) {
    return normalizeDBQuery(db.Song.create(query));
  }

  findOne(query) {
    return normalizeDBQuery(db.Song.findOne(query, "-__v"));
  }
  findById(query) {
    return normalizeDBQuery(db.Song.findById(query, "-__v"));
  }

  findByIdAndUpdate(query, data) {
    return normalizeDBQuery(db.Song.findById(query, data, {}));
  }

  findAll(query) {
    return normalizeDBQuery(db.Song.find(query));
  }

  findOneAndUpdate(query, data) {
    return normalizeDBQuery(db.Song.findOneAndUpdate(query, data, {}));
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.Song.findOneAndDelete(query));
  }
}

module.exports = new SongRepository();
