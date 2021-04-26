import { createSelector } from "reselect";

export const selectLikedSongState = (state) => state.likedSong;

export const likedSongSelector = createSelector(
  [selectLikedSongState],
  (song) => song,
);
