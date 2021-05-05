const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MonthlySongPlaybackSchema = Schema(
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
    totalPlaybacks: {
      type: Number,
      default: 0,
    },
    daily: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: false,
  },
);

const MonthlySongPlayback = mongoose.model(
  "monthly-playback",
  MonthlySongPlaybackSchema,
);

module.exports = MonthlySongPlayback;
