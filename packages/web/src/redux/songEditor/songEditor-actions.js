import api from "../../api";
import * as songEditorTypes from "./songEditor-types";

export const updateSongRequest = () => ({
  type: songEditorTypes.UPDATE_TRACK_REQUEST,
});

export const updateSongError = (message) => ({
  type: songEditorTypes.UPDATE_TRACK_ERROR,
  payload: message,
});

export const updateSongSuccess = (songData) => ({
  type: songEditorTypes.UPDATE_TRACK_SUCCESS,
  payload: songData,
});

export const updateSongReset = () => ({
  type: songEditorTypes.UPDATE_TRACK_RESET,
});

export function updateSong(songData) {
  return async function updateSongThunk(dispatch) {
    dispatch(updateSongRequest());
    try {
      const response = await api.updateSongInfo(songData);
      if (response.errorMessage) {
        return dispatch(updateSongError(response.errorMessage));
      }
      return dispatch(updateSongSuccess(response.data));
    } catch (error) {
      return dispatch(updateSongError(error.message));
    }
  };
}
