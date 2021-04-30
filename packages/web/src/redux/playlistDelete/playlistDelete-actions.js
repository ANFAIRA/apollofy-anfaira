import api from "../../api";
import * as playlistDeleteTypes from "./playlistDelete-types";

export const deletePlaylistRequest = () => ({
  type: playlistDeleteTypes.DELETE_PLAYLIST_REQUEST,
});

export const deletePlaylistError = (message) => ({
  type: playlistDeleteTypes.DELETE_PLAYLIST_ERROR,
  payload: message,
});

export const deletePlaylistSuccess = (playlistId) => ({
  type: playlistDeleteTypes.DELETE_PLAYLIST_SUCCESS,
  payload: playlistId,
});

export const deletePlaylistReset = () => ({
  type: playlistDeleteTypes.DELETE_PLAYLIST_RESET,
});

export function deletePlaylist(playlistId) {
  return async function deletePlaylistThunk(dispatch) {
    dispatch(deletePlaylistRequest());
    try {
      const response = await api.deletePlaylistApi(playlistId);
      if (response.errorMessage) {
        return dispatch(deletePlaylistError(response.errorMessage));
      }
      return dispatch(deletePlaylistSuccess(response.data));
    } catch (error) {
      return dispatch(deletePlaylistError(error.message));
    }
  };
}
