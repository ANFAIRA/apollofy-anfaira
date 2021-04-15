const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.User.findOne(query, "-__v"));
  }

  findOneAndUpdate(query, data) {
    return normalizeDBQuery(db.User.findOneAndUpdate(query, data, {}));
  }
}

module.exports = new UserRepository();
