const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(query) {
    return normalizeDBQuery(db.Track.create(query));
  }

  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query, "-__v"));
  }

  findAll() {
    return normalizeDBQuery(db.Track.find());
  }

  findOneAndUpdate(query) {
    return normalizeDBQuery(db.Track.findOneAndUpdate(query));
  }
}

module.exports = new TrackRepository();
