import { createSelector } from "reselect";

export const selectMySongState = (state) => state.MySongs;

export const mySongSelector = createSelector(
  [selectMySongState],
  (song) => song,
);
