const { UserRepo, TrackRepo } = require("../repositories");
const { logger } = require("../services");

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

async function likeSong(req, res, next) {
  const { id } = req.params;
  const { firebaseId } = req.body;
  try {
    const song = await TrackRepo.findById(id);
    const user = await UserRepo.findOne({
      firebaseId: firebaseId,
    });
    const indexSong = song.data.likedBy.findIndex(
      (id) => String(id) === String(user.data._id),
    );
    if (indexSong === -1) {
      song.data.likedBy.push(user.data._id);
    } else {
      song.data.likedBy = song.data.likedBy.filter(
        (id) => String(id) !== String(user.data._id),
      );
    }

    const indexUser = user.data.likedSongs.findIndex(
      (id) => String(id) === String(song.data._id),
    );
    if (indexUser === -1) {
      user.data.likedSongs.push(song.data._id);
    } else {
      user.data.likedSongs = user.data.likedSongs.filter(
        (id) => String(id) !== String(song.data._id),
      );
    }

    await TrackRepo.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          likedBy: song.data.likedBy,
        },
      },
      { new: true },
    );

    await UserRepo.findOneAndUpdate(
      { firebaseId: firebaseId },
      {
        $set: {
          likedSongs: user.data.likedSongs,
        },
      },
      { new: true },
    );

    const userUpdate = await UserRepo.findOne({
      firebaseId: firebaseId,
    });

    console.log(userUpdate);
    res.status(200).send(userUpdate);
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

async function getLikedSongs(req, res, next) {
  const { uid } = req.user;
  try {
    const user = await UserRepo.findOne({
      firebaseId: uid,
    });

    const songIdArray = user.data.likedSongs;
    const { data } = await TrackRepo.findAll({ _id: { $in: songIdArray } });

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
  updateTrack: updateTrack,
  getMeSongs: getMeSongs,
  likeSong: likeSong,
  deleteTrack: deleteTrack,
  getLikedSongs: getLikedSongs,
};
