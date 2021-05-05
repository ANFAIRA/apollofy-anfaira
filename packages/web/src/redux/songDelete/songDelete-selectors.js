import { createSelector } from "reselect";

export const selectSongDeleteState = (state) => state.songDelete;

export const songDeleteSelector = createSelector(
  [selectSongDeleteState],
  (songDelete) => songDelete,
);
