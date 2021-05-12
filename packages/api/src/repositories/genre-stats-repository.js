const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class GenreStatsRepository {
  create({ genreId, currYear, name, monthKey, dailyKey }) {
    return normalizeDBQuery(
      db.GenreStatistics.create({
        metadata: {
          genre: genreId,
          date: currYear,
          name: name,
        },
        totalPlaybacks: 1,
        playbacks: {
          monthly: {
            [monthKey]: {
              totalPlaybacks: 1,
              daily: {
                [dailyKey]: 1,
              },
            },
          },
        },
      }),
    );
  }

  updateOneStats({ query, monthKey, monthValue, dailyKey, dailyValue }) {
    return normalizeDBQuery(
      db.GenreStatistics.findOneAndUpdate(query, {
        $inc: {
          totalPlaybacks: 1,
        },
        $set: {
          playbacks: {
            monthly: {
              [monthKey]: {
                totalPlaybacks: monthValue,
                daily: { [dailyKey]: dailyValue },
              },
            },
          },
        },
      }),
    );
  }

  find(query, options) {
    return normalizeDBQuery(
      db.GenreStatistics.find(query, "-__v").sort(options).limit(5),
    );
  }

  findOne(query) {
    return normalizeDBQuery(db.GenreStatistics.findOne(query, "-__v"));
  }
}

module.exports = new GenreStatsRepository();
