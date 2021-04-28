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
  console.log();
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

async function addTrackToPlaylist(req, res, next) {
  const { _id } = req.body;

  const { id } = req.params;

  console.log(req.body);

  try {
    const dbResponse = await PlaylistRepo.findOneAndUpdate(
      {
        _id: id,
      },
      {
        tracks: _id,
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
};
