const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GenreSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Genre name is required"],
      trim: true,
      unique: true,
    },
    popularity: {
      type: Number,
      required: false,
      default: 0.0,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "track",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Genre = mongoose.model("genre", GenreSchema);

module.exports = Genre;
