const { UserRepo, TrackRepo } = require("../repositories");
const logger = require("../services/logger");

async function createTrack(req, res, next) {
  const {
    body: { title, url, artist, thumbnail, genre, duration = 0 },
    user: { uid },
  } = req;

  try {
    if (!title && !url) {
      res.status(400).send({
        data: null,
        error: "Missing Fields (title, url)",
      });
    }

    const user = await UserRepo.findOne({
      firebaseId: uid,
    });

    const response = await TrackRepo.create({
      title: title,
      artist: artist,
      url: url ? url : null,
      thumbnail: thumbnail ? thumbnail : null,
      duration: duration ? duration : 0,
      genre: genre ? genre : null,
      authorId: user.data._id,
    });

    if (response.error) {
      return res.status(500).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(201).send({
        data: "OK",
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getAllSongs(req, res, next) {
  try {
    const { data } = await TrackRepo.findAll();

    if (data.error) {
      return res.status(404).send({
        data: null,
        error: data.error,
      });
    }

    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  const { _id, title, artist, thumbnail, genre } = req.body;
  logger.debug(req.body);

  try {
    const response = await TrackRepo.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          title: title,
          artist: artist,
          thumbnail: thumbnail ? thumbnail : null,
          genre: genre ? genre : null,
        },
      },
      { new: true },
    );

    if (response.error) {
      return res.status(500).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: req.body,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getMeSongs(req, res, next) {
  const { uid } = req.user;

  try {
    const user = await UserRepo.findOne({
      firebaseId: uid,
    });

    const { data } = await TrackRepo.findAll({ authorId: user.data._id });

    if (data.error) {
      return res.status(404).send({
        data: null,
        error: data.error,
      });
    }

    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  const { _id } = req.body;
  logger.debug(req.body);

  try {
    const response = await TrackRepo.findOneAndDelete({ _id: _id });
    logger.debug(response);

    if (response.error) {
      return res.status(500).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: req.body,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTrack: createTrack,
  getAllSongs: getAllSongs,
  updateTrack: updateTrack,
  getMeSongs: getMeSongs,
  deleteTrack: deleteTrack,
};
