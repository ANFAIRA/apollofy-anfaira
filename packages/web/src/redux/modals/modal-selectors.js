import { createSelector } from "reselect";

export const selectModalState = (state) => state.modal;

export const modalStateSelector = createSelector(
  [selectModalState],
  (modal) => modal,
);
