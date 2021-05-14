const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SongSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      trim: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "genre",
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    artist: {
      type: [String],
      default: [],
    },
    likedBy: {
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

const Song = mongoose.model("song", SongSchema);

module.exports = Song;
