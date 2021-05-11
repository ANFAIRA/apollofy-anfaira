const { GenreStatsRepo, SongRepo, GenreRepo } = require("../repositories");
const { handleDbResponse } = require("../repositories/repo-utils");

async function extractGenres(req, res, next) {
  const {
    params: { id: songId },
  } = req;

  const songResponse = await SongRepo.findById(songId);

  if (songResponse.data) {
    const genres = [...songResponse.data.genres];
    req.genres = genres;
  }
  next();
}

async function addGenresStats(req, res, next) {
  const { genre } = req;
  console.log(genre);
  if (genres) {
    await Promise.all(
      genres.forEach(async (genreId) => {
        await addGenreStat(genreId);
      }),
    );
  }

  next();
}

async function addGenreStat(genreId) {
  try {
    const currDate = new Date(Date.now());
    const currYear = currDate.getUTCFullYear();
    const monthKey = `${currDate.getUTCMonth() + 1}`;
    const dailyKey = `${currDate.getUTCDate()}`;

    const queryFilter = {
      "metadata.genre": genreId,
      "metadata.date": currYear,
    };

    let dbResponse = await GenreStatsRepo.findOne(queryFilter);

    if (!dbResponse.error) {
      if (dbResponse.data) {
        const monthValue =
          dbResponse.data.playbacks.monthly[monthKey].totalPlaybacks + 1;
        const dailyValue =
          dbResponse.data.playbacks.monthly[monthKey].daily[dailyKey] + 1;
        dbResponse = await GenreStatsRepo.updateOneStats({
          query: queryFilter,
          monthKey: monthKey,
          monthValue: monthValue,
          dailyKey: dailyKey,
          dailyValue: dailyValue,
        });
      } else {
        const currName = await GenreRepo.findById(genreId);

        console.log(
          "🚀 ~ file: genre-stats-controller.js ~ line 61 ~ addGenreStat ~ currName",
          currName.data,
        );
        console.log(
          "🚀 ~ file: genre-stats-controller.js ~ line 68 ~ addGenreStat ~ genreId",
          genreId,
        );

        dbResponse = await GenreStatsRepo.create({
          genreId: genreId,
          currYear: currYear,
          monthKey: monthKey,
          dailyKey: dailyKey,
          currName: currName.data.name,
        });
      }
    }
  } catch (error) {}
}

async function fetchStats(req, res, next) {
  try {
    const dbResponse = await GenreStatsRepo.find(
      {},
      {
        totalPlaybacks: -1,
      },
    );
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

async function fetchStatsByGenre(req, res, next) {
  const {
    params: { id: genreId },
  } = req;

  try {
    const dbResponse = await GenreStatsRepo.findOne({
      "metadata.genre": genreId,
    });
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addGenresStats: addGenresStats,
  fetchStats: fetchStats,
  fetchStatsByGenre: fetchStatsByGenre,
  extractGenres: extractGenres,
};
