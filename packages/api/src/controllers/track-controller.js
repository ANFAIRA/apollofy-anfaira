const { UserRepo, TrackRepo } = require("../repositories");

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

module.exports = {
  createTrack: createTrack,
  getAllSongs: getAllSongs,
};
