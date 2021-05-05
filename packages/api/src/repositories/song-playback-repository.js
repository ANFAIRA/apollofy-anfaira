const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

/*
options = { songId, userId, lat, long, agent }
*/

class SongPlaybackRepository {
  create(options) {
    return normalizeDBQuery(
      db.SongPlayback.create({
        metadata: {
          song: options.songId,
          date: options.currDay,
        },
        totalPlaybacks: 1,
        playbacks: [
          {
            lat: options.lat,
            long: options.long,
            user: options.user,
            agent: options.agent,
            date: Date.now(),
          },
        ],
      }),
    );
  }

  createMonthly(options) {
    return normalizeDBQuery(
      db.MonthlySongPlayback.create({
        metadata: {
          song: options.songId,
          date: options.currMonth,
        },
        totalPlaybacks: 0,
        [options.dailyKey]: 1,
      }),
    );
  }

  findOneAndUpdate({ query, data }) {
    return normalizeDBQuery(
      db.SongPlayback.findOneAndUpdate(
        query,
        {
          $push: {
            playbacks: {
              lat: data.lat,
              long: data.long,
              user: data.user,
              agent: data.agent,
              date: data.date,
            },
          },
        },
        { new: true },
      ),
    );
  }

  findOneMonthlyAndUpdate({ query, dailyKey }) {
    return normalizeDBQuery(
      db.MonthlySongPlayback.findOneAndUpdate(query, {
        $inc: {
          totalPlaybacks: 1,
          [dailyKey]: 1,
        },
      }),
    );
  }

  find(query) {
    return normalizeDBQuery(db.DailySongPlayback.find(query, "-__v"));
  }

  findOne(query) {
    return normalizeDBQuery(db.DailySongPlayback.findOne(query, "-__v"));
  }

  findMonthly(query) {
    return normalizeDBQuery(db.MonthlySongPlayback.find(query, "-__v"));
  }

  findOneMonthly(query) {
    return normalizeDBQuery(db.MonthlySongPlayback.findOne(query, "-__v"));
  }
}

module.exports = new SongPlaybackRepository();
