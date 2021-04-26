import { createSelector } from "reselect";

export const selectTrackDeleteState = (state) => state.trackDelete;

export const trackDeleteSelector = createSelector(
  [selectTrackDeleteState],
  (trackDelete) => trackDelete,
);
