const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  //   findOne(query) {
  //     return normalizeDBQuery(db.Track.findOne(query, "-__v"));
  //   }

  // findOneAndUpdate(query, data) {
  //   return normalizeDBQuery(db.Track.findOneAndUpdate(query, data, {}));
  // }
}

module.exports = new TrackRepository();
