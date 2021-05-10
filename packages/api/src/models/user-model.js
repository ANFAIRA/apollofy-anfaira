const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    firebaseId: String,
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    likedSongs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "songs",
        },
      ],
      default: [],
    },
    followedPlaylist: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "playlist",
        },
      ],
      default: [],
    },
    uploadedSongs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "songs",
        },
      ],
      default: [],
    },
    uploadedPlaylist: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "playlist",
        },
      ],
      default: [],
    },
    followedUsers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
      default: [],
    },
    followers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
