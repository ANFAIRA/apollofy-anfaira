const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TrackSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Track title required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Track url"],
    },
    duration: {
      type: Number,
      default: 0,
    },
    genre: {
      type: String,
      default: "",
    },
    authorId: {
      type: String,
      required: [true, "Author Id"],
    },
    artistId: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
    likedBy: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Track = mongoose.model("track", TrackSchema);

module.exports = Track;
