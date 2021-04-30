import { createSelector } from "reselect";

export const selectPlaylistDeleteState = (state) => state.playlistDelete;

export const playlistDeleteSelector = createSelector(
  [selectPlaylistDeleteState],
  (playlistDelete) => playlistDelete,
);
