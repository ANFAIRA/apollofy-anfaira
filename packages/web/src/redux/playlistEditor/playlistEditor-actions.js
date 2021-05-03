import api from "../../api";
import * as playlistEditorTypes from "./playlistEditor-types";

export const updatePlaylistRequest = () => ({
  type: playlistEditorTypes.UPDATE_PLAYLIST_REQUEST,
});

export const updatePlaylistError = (message) => ({
  type: playlistEditorTypes.UPDATE_PLAYLIST_ERROR,
  payload: message,
});

export const updatePlaylistSuccess = (playlistData) => ({
  type: playlistEditorTypes.UPDATE_PLAYLIST_SUCCESS,
  payload: playlistData,
});

export const updatePlaylistReset = () => ({
  type: playlistEditorTypes.UPDATE_PLAYLIST_RESET,
});

export function updatePlaylist(playlistData) {
  return async function updatePlaylistThunk(dispatch) {
    dispatch(updatePlaylistRequest());
    try {
      const response = await api.updatePlaylistInfo(playlistData);
      if (response.errorMessage) {
        return dispatch(updatePlaylistError(response.errorMessage));
      }
      return dispatch(updatePlaylistSuccess(response.data));
    } catch (error) {
      return dispatch(updatePlaylistError(error.message));
    }
  };
}
