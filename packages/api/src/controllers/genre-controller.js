const { GenreRepo } = require("../repositories");
const { handleDbResponse } = require("../repositories/repo-utils");

async function createGenre(req, res, next) {
  const {
    body: { name },
  } = req;
  // console.log(req.body);
  try {
    if (!name) {
      return res.status(400).send({
        data: null,
        error: "Bad request",
      });
    }

    // console.log(GenreRepo);

    const dbResponse = await GenreRepo.create({
      name: name,
    });

    // console.log(dbResponse);

    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchGenres(req, res, next) {
  // const { params } = req;
  try {
    const dbResponse = await GenreRepo.find();
    // console.log(dbResponse);
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchGenreById(req, res, next) {
  const {
    params: { id },
  } = req;
  try {
    const dbResponse = await GenreRepo.findById(id);
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchGenreByName(req, res, next) {
  const {
    params: { name },
  } = req;
  try {
    const dbResponse = await GenreRepo.findOne({
      name: name,
    });
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function addTrackToGenre(req, res, next) {
  const { genreId, trackId } = req.body;
  console.log(req.body);
  try {
    const dbResponse = await GenreRepo.findOneAndUpdate(
      { _id: genreId },
      {
        $set: {
          tracks: [trackId],
        },
      },
      { new: true },
    );
    console.log(dbResponse);
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGenre: createGenre,
  fetchGenres: fetchGenres,
  fetchGenreById: fetchGenreById,
  fetchGenreByName: fetchGenreByName,
  addTrackToGenre: addTrackToGenre,
};
