const { SongPlaybackRepo, SongRepo } = require("../repositories");
const { handleDbResponse } = require("../repositories/repo-utils");

// options: { songId, userId, lat, long, agent }
async function addPlayback(req, res, next) {
  const {
    params: { id: songId },
    // body: { lat, long, agent },
    // user: { id: userId },
  } = req;

  try {
    let dbResponse;
    dbResponse = await SongRepo.findById(songId);

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data && !dbResponse.error) {
      const currDate = new Date(Date.now());
      const currDay = currDate.toISOString().substring(0, 10);

      dbResponse = await SongPlaybackRepo.findOneAndUpdate({
        query: {
          "metadata.song": songId,
          "metadata.date": currDay,
        },
        data: {
          // lat: lat,
          // long: long,
          // user: userId,
          // agent: agent,
          date: currDate,
        },
      });

      if (dbResponse.error) {
        res.status(400).send({
          data: null,
          error: dbResponse.error,
        });
      }

      if (!dbResponse.data) {
        dbResponse = await SongPlaybackRepo.create({
          songId: songId,
          currDay: currDay,
          // user: userId,
          // lat: lat,
          // long: long,
          // agent: agent,
        });
      }

      if (dbResponse.error) {
        res.status(400).send({
          data: null,
          error: dbResponse.error,
        });
      }

      const currMonth = currDate.toISOString().substring(0, 7);
      const dailyKey = `daily.${currDate.getUTCDate()}`;

      dbResponse = await SongPlaybackRepo.findOneMonthlyAndUpdate({
        query: {
          "metadata.song": songId,
          "metadata.date": currMonth,
        },
        dailyKey: dailyKey,
      });

      if (dbResponse.error) {
        res.status(400).send({
          data: null,
          error: dbResponse.error,
        });
      }

      if (!dbResponse.data) {
        dbResponse = await SongPlaybackRepo.createMonthly({
          songId: songId,
          currMonth: currMonth,
          dailyKey: dailyKey,
        });
      }
      console.log(dbResponse.data);
    }
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

async function fetchPlaybacks(req, res, next) {
  const { params } = req;

  try {
    const dbResponse = await SongPlaybackRepo.findDaily(params);
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

async function fetchById(req, res, next) {
  const {
    params: { id },
  } = req;

  try {
    const dbResponse = await SongPlaybackRepo.findOneDaily({
      id: id,
    });
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

async function fetchMonthlyPlaybacks(req, res, next) {
  const { params } = req;

  try {
    const dbResponse = await SongPlaybackRepo.findMonthly(params);
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

async function fetchMonthlyById(req, res, next) {
  const {
    params: { id },
  } = req;

  try {
    const dbResponse = await SongPlaybackRepo.findOneMonthly({
      id: id,
    });
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addPlayback: addPlayback,
  fetchPlaybacks: fetchPlaybacks,
  fetchById: fetchById,
  fetchMonthlyPlaybacks: fetchMonthlyPlaybacks,
  fetchMonthlyById: fetchMonthlyById,
};
