const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Playlist title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ["playlist", "album"],
      required: true,
    },
    collaborative: {
      type: Boolean,
      required: false,
      default: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    publicAccessible: {
      type: Boolean,
      required: false,
      default: false,
    },
    total_songs: {
      type: Number,
      default: 0,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    songs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "song",
        },
      ],
      default: [],
    },
    followedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
      default: [],
    },
    collaborators: {
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

const Playlist = mongoose.model("playlist", PlaylistSchema);

module.exports = Playlist;
