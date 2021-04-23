const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query, "-__v"));
  }
  findById(query) {
    return normalizeDBQuery(db.Track.findById(query, "-__v"));
  }

  findByIdAndUpdate(query, data) {
    return normalizeDBQuery(db.Track.findById(query, data, {}));
  }

  findAll() {
    return normalizeDBQuery(db.Track.find());
  }

  findOneAndUpdate(query, data) {
    return normalizeDBQuery(db.Track.findOneAndUpdate(query, data, {}));
  }
}

module.exports = new TrackRepository();
