const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(query) {
    return normalizeDBQuery(db.Track.create(query));
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

  findAll(query) {
    return normalizeDBQuery(db.Track.find(query));
  }

  findOneAndUpdate(query) {
    return normalizeDBQuery(db.Track.findOneAndUpdate(query));
  }

  findOneAndUpdate(query, data) {
    return normalizeDBQuery(db.Track.findOneAndUpdate(query, data, {}));
  }
}

module.exports = new TrackRepository();
