const trackRepository = require("./track-repository");
const UserRepository = require("./user-repository");

module.exports = {
  UserRepo: UserRepository,
  TrackRepo: trackRepository,
};
