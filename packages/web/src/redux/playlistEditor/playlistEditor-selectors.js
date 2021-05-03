import { createSelector } from "reselect";

export const selectPlaylistEditorState = (state) => state.playlistEditor;

export const playlistEditorSelector = createSelector(
  [selectPlaylistEditorState],
  (playlistEditor) => playlistEditor,
);
