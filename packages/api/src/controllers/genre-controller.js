const { GenreRepo } = require("../repositories");
const { handleDbResponse } = require("../repositories/repo-utils");

async function createGenre(req, res, next) {
  const {
    body: { name },
  } = req;

  try {
    if (!name) {
      return res.status(400).send({
        data: null,
        error: "Bad request",
      });
    }

    const dbResponse = await GenreRepo.create({
      name: name,
    });

    if (dbResponse.data) {
      return res.status(201).send({
        data: dbResponse.data._id,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function fetchGenres(req, res, next) {
  try {
    const dbResponse = await GenreRepo.find();

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

async function addSongToGenre(req, res, next) {
  const { genreId, songId } = req.body;

  try {
    const genre = await GenreRepo.findOne({ _id: genreId });
    const dbResponse = await GenreRepo.findOneAndUpdate(
      { _id: genreId },
      {
        $set: {
          songs: [...genre.data.songs, songId],
        },
      },
      { new: true },
    );

    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function deleteSongFromGenre(req, res, next) {
  const { genreId, songId } = req.body;

  try {
    const genre = await GenreRepo.findOne({ _id: genreId });

    const songIndex = genre.data.songs.indexOf(String(songId));

    genre.data.songs.splice(songIndex, 1);

    const dbResponse = await GenreRepo.findOneAndUpdate(
      {
        _id: genreId,
      },
      {
        songs: genre.data.songs,
      },
      {
        new: true,
        select: {
          __v: 0,
        },
      },
    );

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      res.status(200).send({
        data: dbResponse.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGenre: createGenre,
  fetchGenres: fetchGenres,
  fetchGenreById: fetchGenreById,
  fetchGenreByName: fetchGenreByName,
  addSongToGenre: addSongToGenre,
  deleteSongFromGenre: deleteSongFromGenre,
};
