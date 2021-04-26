import { createSelector } from "reselect";

export const selectTrackEditorState = (state) => state.trackEditor;

export const trackEditorSelector = createSelector(
  [selectTrackEditorState],
  (trackEditor) => trackEditor,
);
