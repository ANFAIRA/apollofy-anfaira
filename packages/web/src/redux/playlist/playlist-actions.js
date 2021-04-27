import * as PlaylistTypes from "./playlist-types";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";
import { signOutSuccess } from "../auth/auth-actions";

export const playlistCreateRequest = () => ({
  type: PlaylistTypes.CREATE_PLAYLIST_REQUEST,
});

export const playlistCreateError = (message) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_ERROR,
  payload: message,
});

export const playlistCreateSuccess = (data) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_SUCCESS,
  payload: data,
});

export function createPlaylist({ title, type, thumbnail, publicAccessible }) {
  return async function createThunk(dispatch) {
    dispatch(playlistCreateRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(signOutSuccess());
      }

      const res = await api.createPlaylist({
        body: {
          title: title,
          type: type,
          thumbnail: thumbnail,
          publicAccessible: publicAccessible,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.errorMessage) {
        return dispatch(playlistCreateError(res.errorMessage));
      }

      return dispatch(playlistCreateSuccess(res.data));
    } catch (err) {
      return dispatch(playlistCreateError(err));
    }
  };
}
