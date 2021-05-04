import api from "../../api";
import * as trackEditorTypes from "./trackEditor-types";

export const setTrackToUpdate = (trackData) => ({
  type: trackEditorTypes.TRACK_TO_UPDATE,
  payload: trackData,
});

export const updateTrackRequest = () => ({
  type: trackEditorTypes.UPDATE_TRACK_REQUEST,
});

export const updateTrackError = (message) => ({
  type: trackEditorTypes.UPDATE_TRACK_ERROR,
  payload: message,
});

export const updateTrackSuccess = (trackData) => ({
  type: trackEditorTypes.UPDATE_TRACK_SUCCESS,
  payload: trackData,
});

export const updateTrackReset = () => ({
  type: trackEditorTypes.UPDATE_TRACK_RESET,
});

export function updateSong(trackData) {
  return async function updateSongThunk(dispatch) {
    dispatch(updateTrackRequest());
    try {
      const response = await api.updateSongInfo(trackData);
      if (response.errorMessage) {
        return dispatch(updateTrackError(response.errorMessage));
      }
      return dispatch(updateTrackSuccess(response.data));
    } catch (error) {
      return dispatch(updateTrackError(error.message));
    }
  };
}
