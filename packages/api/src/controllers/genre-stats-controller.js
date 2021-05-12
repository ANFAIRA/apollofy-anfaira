const { GenreStatsRepo } = require("../repositories");
const { handleDbResponse } = require("../repositories/repo-utils");

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

module.exports = {
  fetchStats: fetchStats,
};
