const { UserRepo, SongRepo } = require("../repositories");

async function createSong(req, res, next) {
  const {
    body: { title, url, artist, thumbnail, genre, duration },
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
    console.log(
      "🚀 ~ file: song-controller.js ~ line 20 ~ createSong ~ user",
      user.data._id,
    );

    const response = await SongRepo.create({
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
      await UserRepo.findOneAndUpdate(
        { _id: user.data._id },
        { $push: { uploadedSongs: response.data._id } },
        {
          new: true,
        },
      );
      return res.status(201).send({
        data: response.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getAllSongs(req, res, next) {
  try {
    const { data } = await SongRepo.findAll();

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

async function updateSong(req, res, next) {
  const { _id, title, artist, thumbnail, genre } = req.body;

  try {
    const response = await SongRepo.findOneAndUpdate(
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

    const { data } = await SongRepo.findAll({ authorId: user.data._id });

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
    const song = await SongRepo.findById(id);
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

    await SongRepo.findOneAndUpdate(
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

    res.status(200).send(userUpdate);
  } catch (error) {
    next(error);
  }
}

async function deleteSong(req, res, next) {
  const { _id } = req.body;

  try {
    const response = await SongRepo.findOneAndDelete({ _id: _id });

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
    const { data } = await SongRepo.findAll({ _id: { $in: songIdArray } });

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
  createSong: createSong,
  getAllSongs: getAllSongs,
  updateSong: updateSong,
  getMeSongs: getMeSongs,
  likeSong: likeSong,
  deleteSong: deleteSong,
  getLikedSongs: getLikedSongs,
};
