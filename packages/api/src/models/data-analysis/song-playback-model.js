const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SongPlaybackSchema = Schema(
  {
    metadata: {
      type: {
        date: {
          type: Date,
          default: Date.now,
        },
        song: {
          type: Schema.Types.ObjectId,
          ref: "song",
        },
      },
    },
    playbacks: {
      type: [
        {
          lat: {
            type: Number,
            required: false,
          },
          long: {
            type: Number,
            required: false,
          },
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          agent: {
            type: String,
            trim: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: false,
  },
);

const SongPlayback = mongoose.model("song-playback", SongPlaybackSchema);

module.exports = SongPlayback;
