import * as PlaylistTypes from "./playlist-types";
import { playlistTypes } from "./playlist-types";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";
import { signOutSuccess } from "../auth/auth-actions";
import { normalizeFullPlaylists } from "../../schema/playlist-schema";

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

export function createPlaylist({
  title,
  type,
  thumbnail,
  publicAccessible,
  description,
}) {
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
          description: description,
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

export const fetchPlaylistsRequest = () => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_REQUEST,
});

export const fetchPlaylistsError = (message) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_ERROR,
  payload: message,
});

export const fetchPlaylistsSuccess = ({
  fetchType = playlistTypes.ALL,
  playlistByID,
  trackByID,
  playlistIds,
}) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_SUCCESS,
  payload: {
    playlistByID: playlistByID,
    trackByID: trackByID,
    playlistIds: playlistIds,
    type: fetchType,
  },
});

export function fetchPlaylists({
  fetchType = playlistTypes.ALL,
  filters = {},
}) {
  switch (fetchType) {
    case playlistTypes.ALL:
      return fetchAllPlaylists(filters);
    default:
      break;
  }
  return fetchAllPlaylists(filters);
}

export function fetchAllPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    try {
      const userToken = await getCurrentUserToken();

      // if (!userToken) {
      //   return dispatch(signOutSuccess());
      // }

      const res = await api.fetchPlaylists({
        Authorization: `Bearer ${userToken}`,
      });

      if (res.errorMessage) {
        return dispatch(fetchPlaylistsError(res.errorMessage));
      }

      const normalizedData = normalizeFullPlaylists(res.data.data);

      return dispatch(
        fetchPlaylistsSuccess({
          playlistByID: normalizedData.entities.playlists,
          trackByID: normalizedData.entities.tracks,
          playlistIds: normalizedData.result,
        }),
      );
    } catch (err) {
      return dispatch(fetchPlaylistsError(err));
    }
  };
}

export const addSongToPlaylistRequest = () => ({
  type: PlaylistTypes.ADD_SONG_TO_PLAYLIST_REQUEST,
});

export const addSongToPlaylistError = (message) => ({
  type: PlaylistTypes.ADD_SONG_TO_PLAYLIST_ERROR,
  payload: message,
});

export const addSongToPlaylistSuccess = () => ({
  type: PlaylistTypes.ADD_SONG_TO_PLAYLIST_SUCCESS,
});

export function addSongToPlaylist(playlistId, songId) {
  return async function addSongToPlaylistThunk(dispatch) {
    dispatch(addSongToPlaylistRequest());

    try {
      const res = await api.addSongToPlaylist({ playlistId, songId });

      if (res.errorMessage) {
        return dispatch(addSongToPlaylistError(res.errorMessage));
      }

      return dispatch(addSongToPlaylistSuccess());
    } catch (error) {
      return dispatch(addSongToPlaylistError(error));
    }
  };
}
