const { PlaylistRepo, UserRepo } = require("../repositories");

async function createPlaylist(req, res, next) {
  console.log(req.user);
  const {
    body: { title, type, publicAccessible, tracks },
    user: { uid },
  } = req;

  try {
    const user = await UserRepo.findOne({ firebaseId: uid });
    console.log(user);
    const dbResponse = await PlaylistRepo.create({
      title: title,
      type: type,
      author: user.data._id,
      publicAccessible: publicAccessible,
      tracks: tracks ? tracks : [],
    });

    console.log(dbResponse);
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

module.exports = {
  createPlaylist: createPlaylist,
};
