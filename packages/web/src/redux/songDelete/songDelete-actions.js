import api from "../../api";
import * as songDeleteTypes from "./songDelete-types";

export const deleteSongRequest = () => ({
  type: songDeleteTypes.DELETE_TRACK_REQUEST,
});

export const deleteSongError = (message) => ({
  type: songDeleteTypes.DELETE_TRACK_ERROR,
  payload: message,
});

export const deleteSongSuccess = (songId) => ({
  type: songDeleteTypes.DELETE_TRACK_SUCCESS,
  payload: songId,
});

export const deleteSongReset = () => ({
  type: songDeleteTypes.DELETE_TRACK_RESET,
});

export function deleteSong(songId) {
  return async function deleteSongThunk(dispatch) {
    dispatch(deleteSongRequest());
    try {
      const response = await api.deleteSongApi(songId);
      if (response.errorMessage) {
        return dispatch(deleteSongError(response.errorMessage));
      }
      return dispatch(deleteSongSuccess(response.data));
    } catch (error) {
      return dispatch(deleteSongError(error.message));
    }
  };
}
