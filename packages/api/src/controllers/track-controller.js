const { UserRepo, TrackRepo } = require("../repositories");

const createTrack = async (req, res, next) => {
  const {
    body: { title, url, duration },
    user: { uid },
  } = req;

  if (!title && !url) {
    res.status(400).send({
      data: null,
      error: "No title and/or url was specified",
    });
  }

  console.log(`User ID: ${uid}`);

  const user = await UserRepo.findOne({
    firebaseId: uid,
  });

  const response = await TrackRepo.create({
    title: title,
    url: url,
    duration: duration,
    authorId: user._id,
  });

  if (response.error) {
    response.status(500).send({
      data: null,
      error: response.error,
    });
  }

  if (response.data) {
    response
      .status(201)
      .send({
        data: response.data,
        error: null,
      })
      .catch((err) => {
        next(err);
      });
  }
};

module.exports = {
  createTrack: createTrack,
};
