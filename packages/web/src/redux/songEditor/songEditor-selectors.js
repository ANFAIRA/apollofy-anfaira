import { createSelector } from "reselect";

export const selectSongEditorState = (state) => state.songEditor;

export const songEditorSelector = createSelector(
  [selectSongEditorState],
  (songEditor) => songEditor,
);
