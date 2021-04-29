const { PlaylistRepo, UserRepo, TrackRepo } = require("../repositories");

async function createPlaylist(req, res, next) {
  const {
    body: { title, type, publicAccessible, tracks, description, thumbnail },
    user: { uid },
  } = req;

  try {
    const user = await UserRepo.findOne({ firebaseId: uid });
    const dbResponse = await PlaylistRepo.create({
      title: title,
      type: type,
      author: user.data._id,
      publicAccessible: publicAccessible ? publicAccessible : false,
      tracks: tracks ? tracks : [],
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
      res.status(201).send({
        data: dbResponse.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function addFullTracksInfo(playlist) {
  const newTracks = await Promise.all(
    playlist.tracks.map(async (trackId) => {
      const trackResponse = await TrackRepo.findById(trackId);
      if (trackResponse.data) {
        return trackResponse.data;
      }
      return { _id: trackId };
    }),
  );
  playlist.tracks = newTracks;
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
            const newPlaylist = await addFullTracksInfo(p);
            return newPlaylist;
          }),
        );
      }
      res.status(200).send({
        data: dbResponse.data,
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
        path: "tracks",
        select: "-__v",
      },
    ]);
    console.log(playlist);

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

async function addTrackToPlaylist(req, res, next) {
  const { playlistId, songId } = req.body;

  try {
    let play = await PlaylistRepo.findByIdAndPopulate(playlistId, [
      {
        path: "author",
        select: "username",
      },
    ]);
    console.log(play);

    const playlist = await PlaylistRepo.findOne({ _id: playlistId });

    const indexSong = playlist.data.tracks.findIndex(
      (id) => String(id) === String(songId),
    );
    if (indexSong === -1) {
      playlist.data.tracks.push(songId);
    }

    const dbResponse = await PlaylistRepo.findOneAndUpdate(
      {
        _id: playlistId,
      },
      {
        tracks: playlist.data.tracks,
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

    // console.log(dbResponse);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPlaylist: createPlaylist,
  fetchPlaylists: fetchPlaylists,
  addTrackToPlaylist: addTrackToPlaylist,
  fetchPlaylistById: fetchPlaylistById,
};
