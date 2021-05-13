const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.User.find(query, "-__v"));
  }

  findOne(query, options = "-__v") {
    return normalizeDBQuery(db.User.findOne(query, options));
  }

  findOneAndUpdate(query, data) {
    return normalizeDBQuery(db.User.findOneAndUpdate(query, data, {}));
  }

  updateMany(query, data, options) {
    return normalizeDBQuery(db.User.updateMany(query, data, options));
  }
}

module.exports = new UserRepository();
