const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query, options = "-__v") {
    return normalizeDBQuery(db.User.findOne(query, options));
  }

  findOneAndUpdate(query, data) {
    return normalizeDBQuery(db.User.findOneAndUpdate(query, data, {}));
  }
}

module.exports = new UserRepository();
