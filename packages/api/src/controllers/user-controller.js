const { UserRepo } = require("../repositories");

async function signUp(req, res, next) {
  const { uid, email } = req.user;
  try {
    const { firstName, lastName, username } = req.body.currentUser
      ? req.body.currentUser
      : {
          firstName: "",
          lastName: "",
          username: email.split("@")[0],
        };
    const response = await UserRepo.findOne({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: response.data,
        error: null,
      });
    }

    await UserRepo.create({
      firebaseId: uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      username: username,
    });

    res.status(201).send({
      data: req.body.currentUser,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: "OK",
    error: null,
  });
}

async function updateUser(req, res, next) {
  const { firebaseId, firstName, lastName, username } = req.body;

  try {
    await UserRepo.findOneAndUpdate(
      { firebaseId: firebaseId },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          username: username,
        },
      },
      { new: true },
    );

    const updatedUser = await UserRepo.findOne({ firebaseId: firebaseId });

    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function fetchUsers(req, res, next) {
  try {
    const dbResponse = await UserRepo.find();

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    res.status(200).send({
      data: dbResponse.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function fetchUserById(req, res, next) {
  const { id } = req.params;

  try {
    const dbResponse = await UserRepo.findOne({ _id: id });

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    res.status(200).send({
      data: dbResponse.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteSongFromAllUsers(req, res, next) {
  const { songId } = req.body;
  console.log(songId);

  try {
    const dbResponse = await UserRepo.updateMany(
      {
        uploadedSongs: songId,
      },
      { $pull: { uploadedSongs: { $in: [songId] } } },
      { multi: true, new: true },
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

module.exports = {
  signUp: signUp,
  signOut: signOut,
  updateUser: updateUser,
  fetchUsers: fetchUsers,
  fetchUserById: fetchUserById,
  deleteSongFromAllUsers: deleteSongFromAllUsers,
};
