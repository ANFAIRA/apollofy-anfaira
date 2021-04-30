import * as PlaylistTypes from "./playlist-types";
import { playlistTypes } from "./playlist-types";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";
import { signOutSuccess } from "../auth/auth-actions";
import { normalizeFullPlaylists } from "../../schema/playlist-schema";

// Create new playlist

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

// Fetch a collection of playlists

export const fetchPlaylistsRequest = (fetchType) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_REQUEST,
  payload: fetchType,
});

export const fetchPlaylistsError = (message) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_ERROR,
  payload: message,
});

export const fetchAllPlaylistsSuccess = ({
  type,
  playlistByID,
  trackByID,
  playlistIds,
}) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_SUCCESS,
  payload: {
    playlistByID: playlistByID,
    trackByID: trackByID,
    playlistIds: playlistIds,
    type: type,
  },
});

export function fetchPlaylists(fetchType) {
  switch (fetchType) {
    case playlistTypes.ALL:
      return fetchAllPlaylists();
    case playlistTypes.OWN:
      return fetchOwnPlaylists();
    default:
      break;
  }
  return fetchAllPlaylists();
}

// Fetch all playlists

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
        fetchAllPlaylistsSuccess({
          playlistByID: normalizedData.entities.playlists,
          trackByID: normalizedData.entities.tracks,
          playlistIds: normalizedData.result,
          type: res.data.type,
        }),
      );
    } catch (err) {
      return dispatch(fetchPlaylistsError(err));
    }
  };
}

// Fetch own playlists

export function fetchOwnPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    const userToken = await getCurrentUserToken();

    if (!userToken) {
      return dispatch(signOutSuccess());
    }

    try {
      const res = await api.getOwnPlaylists({
        Authorization: `Bearer ${userToken}`,
      });

      if (res.errorMessage) {
        return dispatch(fetchPlaylistsError(res.errorMessage));
      }

      const normalizedPlaylists = normalizeFullPlaylists(res.data.data);

      return dispatch(
        fetchAllPlaylistsSuccess({
          playlistByID: normalizedPlaylists.entities.playlists,
          playlistIds: normalizedPlaylists.result,
          type: res.data.type,
        }),
      );
    } catch (err) {
      return dispatch(fetchPlaylistsError(err));
    }
  };
}

// Fetch Playlist by ID

export const fetchPlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.FETCH_PLAYLIST_BY_ID_SUCCESS,
  payload: playlist,
});

export function fetchPlaylistById(playlistId) {
  return async function fetchPlaylistByIdThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    try {
      const res = await api.fetchPlaylistById(playlistId);
      if (res.errorMessage) {
        return dispatch(fetchPlaylistsError(res.errorMessage));
      }
      return dispatch(fetchPlaylistSuccess(res.data.data));
    } catch (err) {
      return dispatch(fetchPlaylistsError(err));
    }
  };
}

// Add song to playlist

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
