const { PlaylistRepo, UserRepo, SongRepo } = require("../repositories");

async function createPlaylist(req, res, next) {
  const {
    body: { title, type, publicAccessible, songs, description, thumbnail },
    user: { uid },
  } = req;

  try {
    const user = await UserRepo.findOne({ firebaseId: uid });
    const dbResponse = await PlaylistRepo.create({
      title: title,
      type: type,
      author: user.data._id,
      publicAccessible: publicAccessible ? publicAccessible : false,
      songs: songs ? songs : [],
      description: description,
      thumbnail: thumbnail,
    });

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      await UserRepo.findOneAndUpdate(
        { _id: user.data._id },
        { $push: { uploadedPlaylist: dbResponse.data._id } },
        {
          new: true,
        },
      );
      res.status(201).send({
        data: dbResponse.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function addFullSongsInfo(playlist) {
  const newSongs = await Promise.all(
    playlist.songs.map(async (songId) => {
      const songResponse = await SongRepo.findById(songId);
      if (songResponse.data) {
        return songResponse.data;
      }
      return { _id: songId };
    }),
  );
  playlist.songs = newSongs;
  return playlist;
}

async function fetchPlaylists(req, res, next) {
  const {
    query: { fullFetch },
  } = req;

  try {
    let dbResponse = await PlaylistRepo.find();

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      if (fullFetch) {
        dbResponse.data = await Promise.all(
          dbResponse.data.map(async (p) => {
            const newPlaylist = await addFullSongsInfo(p);
            return newPlaylist;
          }),
        );
      }
      res.status(200).send({
        data: dbResponse.data,
        type: "ALL",
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function fetchPlaylistById(req, res, next) {
  const {
    params: { id },
  } = req;

  try {
    let playlist = await PlaylistRepo.findByIdAndPopulate(id, [
      {
        path: "author",
        select: "username",
      },
      {
        path: "songs",
        select: "-__v",
      },
    ]);

    if (playlist.error) {
      res.status(400).send({
        data: null,
        error: playlist.error,
      });
    }

    if (playlist.data) {
      res.status(200).send({
        data: playlist.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function addSongToPlaylist(req, res, next) {
  const { playlistId, songId } = req.body;

  try {
    await PlaylistRepo.findByIdAndPopulate(playlistId, [
      {
        path: "author",
        select: "username",
      },
    ]);
    const playlist = await PlaylistRepo.findOne({ _id: playlistId });

    const indexSong = playlist.data.songs.findIndex(
      (id) => String(id) === String(songId),
    );
    if (indexSong === -1) {
      playlist.data.songs.push(songId);
    }

    const dbResponse = await PlaylistRepo.findOneAndUpdate(
      {
        _id: playlistId,
      },
      {
        songs: playlist.data.songs,
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

async function deleteSongFromPlaylist(req, res, next) {
  const { playlistId, songId } = req.body;

  try {
    const playlist = await PlaylistRepo.findOne({ _id: playlistId });

    const songIndex = playlist.data.songs.indexOf(String(songId));
    playlist.data.songs.splice(songIndex, 1);

    const dbResponse = await PlaylistRepo.findOneAndUpdate(
      {
        _id: playlistId,
      },
      {
        songs: playlist.data.songs,
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

async function fetchOwnPlaylists(req, res, next) {
  const { uid } = req.user;
  const { fullFetch } = req.query;

  try {
    const user = await UserRepo.findOne({
      firebaseId: uid,
    });

    const dbResponse = await PlaylistRepo.find({
      author: user.data._id,
    });

    if (dbResponse.error) {
      return res.status(404).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      if (fullFetch) {
        dbResponse.data = await Promise.all(
          dbResponse.data.map(async (p) => {
            const newPlaylist = await addFullSongsInfo(p);
            return newPlaylist;
          }),
        );
      }
      res.status(200).send({
        data: dbResponse.data,
        type: "OWN",
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function followPlaylist(req, res, next) {
  const { id } = req.params;
  const { firebaseId } = req.body;

  try {
    const playlist = await PlaylistRepo.findById(id);
    const user = await UserRepo.findOne({
      firebaseId: firebaseId,
    });

    const followPlaylistIndex = playlist.data.followedBy.findIndex(
      (id) => String(id) === String(user.data._id),
    );
    if (followPlaylistIndex === -1) {
      playlist.data.followedBy.push(user.data._id);
    } else {
      playlist.data.followedBy = playlist.data.followedBy.filter(
        (id) => String(id) !== String(user.data._id),
      );
    }

    const indexUser = user.data.followedPlaylist.findIndex(
      (id) => String(id) === String(playlist.data._id),
    );
    if (indexUser === -1) {
      user.data.followedPlaylist.push(playlist.data._id);
    } else {
      user.data.followedPlaylist = user.data.likedSongs.filter(
        (id) => String(id) !== String(playlist.data._id),
      );
    }

    await UserRepo.findOneAndUpdate(
      { firebaseId: firebaseId },
      {
        $set: {
          followedPlaylist: user.data.followedPlaylist,
        },
      },
      { new: true },
    );

    const followedPlaylist = await PlaylistRepo.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          followedBy: playlist.data.followedBy,
        },
      },
      { new: true },
    );

    res.status(200).send(followedPlaylist);
  } catch (error) {
    next(error);
  }
}

async function deletePlaylist(req, res, next) {
  const { _id } = req.body;

  try {
    const dbResponse = await PlaylistRepo.findOneAndDelete({
      _id: _id,
    });

    if (dbResponse.error) {
      res.status(500).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      res.status(200).send({
        data: req.body,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function fetchFollowedPlaylists(req, res, next) {
  const { uid } = req.user;
  const { fullFetch } = req.query;

  try {
    const followedPlaylists = await UserRepo.findOne(
      {
        firebaseId: uid,
      },
      "followedPlaylist",
    );
    const followedPlaylistsIdsArray = followedPlaylists.data.followedPlaylist;

    const dbResponse = await PlaylistRepo.find({
      _id: { $in: followedPlaylistsIdsArray },
    });

    if (dbResponse.error) {
      return res.status(404).send({
        data: null,
        error: dbResponse.error,
      });
    }
    if (fullFetch) {
      dbResponse.data = await Promise.all(
        dbResponse.data.map(async (p) => {
          const newPlaylist = await addFullSongsInfo(p);
          return newPlaylist;
        }),
      );
    }

    res.status(200).send({
      data: dbResponse.data,
      type: "FOLLOWING",
      error: null,
    });
  } catch (err) {
    next(err);
  }
}

async function updatePlaylist(req, res, next) {
  const {
    _id,
    title,
    type,
    thumbnail,
    publicAccessible,
    description,
  } = req.body;

  try {
    const dbResponse = await PlaylistRepo.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        $set: {
          title: title,
          thumbnail: thumbnail,
          type: type,
          publicAccessible: publicAccessible ? publicAccessible : true,
          description: description,
        },
      },
      {
        new: true,
      },
    );

    if (dbResponse.error) {
      res.status(500).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      res.status(200).send({
        data: req.body,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function updatePlaylistOrder(req, res, next) {
  const { playlistId, songs } = req.body;

  try {
    const dbResponse = await PlaylistRepo.findOneAndUpdate(
      {
        _id: playlistId,
      },
      {
        songs: songs,
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
  createPlaylist: createPlaylist,
  fetchPlaylists: fetchPlaylists,
  addSongToPlaylist: addSongToPlaylist,
  deleteSongFromPlaylist: deleteSongFromPlaylist,
  fetchPlaylistById: fetchPlaylistById,
  fetchOwnPlaylists: fetchOwnPlaylists,
  followPlaylist: followPlaylist,
  fetchFollowedPlaylists: fetchFollowedPlaylists,
  deletePlaylist: deletePlaylist,
  updatePlaylist: updatePlaylist,
  updatePlaylistOrder: updatePlaylistOrder,
};
