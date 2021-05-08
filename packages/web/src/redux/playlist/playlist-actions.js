import api from "../../api";
import { normalizeFullPlaylists } from "../../schema/playlist-schema";
import { getCurrentUserToken } from "../../services/auth";
import { signOutSuccess } from "../auth/auth-actions";
import * as PlaylistTypes from "./playlist-types";
import { playlistTypes } from "./playlist-types";

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

      dispatch(playlistCreateSuccess(res.data));
      return dispatch(addCreatedPlaylist(res.data));
    } catch (err) {
      return dispatch(playlistCreateError(err));
    }
  };
}

// Fetch a collection of playlists

export const fetchPlaylistsRequest = () => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_REQUEST,
});

export const fetchPlaylistsError = (message) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_ERROR,
  payload: message,
});

export const fetchAllPlaylistsSuccess = ({
  type = playlistTypes.ALL,
  playlistsByID,
  songByID,
  playlistIds,
}) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_SUCCESS,
  payload: {
    playlistsByID: playlistsByID,
    songByID: songByID,
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
    case playlistTypes.FOLLOWING:
      return fetchFollowedPlaylists();
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
          playlistsByID: normalizedData.entities.playlists,
          songByID: normalizedData.entities.songs,
          playlistIds: normalizedData.result,
          type: playlistTypes.ALL,
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
          playlistsByID: normalizedPlaylists.entities.playlists,
          playlistIds: normalizedPlaylists.result,
          type: playlistTypes.OWN,
        }),
      );
    } catch (err) {
      return dispatch(fetchPlaylistsError(err));
    }
  };
}

// Fetch Playlist by ID

export const fetchPlaylistByIdSuccess = (playlist) => ({
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
      return dispatch(fetchPlaylistByIdSuccess(res.data.data));
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
      const res = await api.addSongToPlaylist({
        playlistId,
        songId,
      });

      if (res.errorMessage) {
        return dispatch(addSongToPlaylistError(res.errorMessage));
      }

      return dispatch(addSongToPlaylistSuccess());
    } catch (error) {
      return dispatch(addSongToPlaylistError(error));
    }
  };
}

// Delete song from playlist

export const deleteSongFromPlaylistRequest = () => ({
  type: PlaylistTypes.DELETE_SONG_FROM_PLAYLIST_REQUEST,
});

export const deleteSongFromPlaylistError = (message) => ({
  type: PlaylistTypes.DELETE_SONG_FROM_PLAYLIST_ERROR,
  payload: message,
});

export const deleteSongFromPlaylistSuccess = () => ({
  type: PlaylistTypes.DELETE_SONG_FROM_PLAYLIST_SUCCESS,
});

export function deleteSongFromPlaylist(playlistId, songId) {
  return async function deleteSongFromPlaylistThunk(dispatch) {
    dispatch(deleteSongFromPlaylistRequest());

    try {
      const res = await api.deleteSongFromPlaylist({
        playlistId,
        songId,
      });

      if (res.errorMessage) {
        return dispatch(deleteSongFromPlaylistError(res.errorMessage));
      }

      return dispatch(deleteSongFromPlaylistSuccess());
    } catch (error) {
      return dispatch(deleteSongFromPlaylistError(error));
    }
  };
}

// Fetch followed playlists

export function fetchFollowedPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    const userToken = await getCurrentUserToken();

    if (!userToken) {
      return dispatch(signOutSuccess());
    }

    try {
      const res = await api.getFollowedPlaylists({
        Authorization: `Bearer ${userToken}`,
      });

      if (res.errorMessage) {
        return dispatch(fetchPlaylistsError(res.errorMessage));
      }

      const normalizedPlaylists = normalizeFullPlaylists(res.data.data);

      return dispatch(
        fetchAllPlaylistsSuccess({
          playlistsByID: normalizedPlaylists.entities.playlists,
          playlistIds: normalizedPlaylists.result,
          type: playlistTypes.FOLLOWING,
        }),
      );
    } catch (err) {
      return dispatch(fetchPlaylistsError(err));
    }
  };
}

// Update playlist

export const updatePlaylistRequest = () => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_REQUEST,
});

export const updatePlaylistError = (message) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_ERROR,
  payload: message,
});

export const updatePlaylistSuccess = (playlistData) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_SUCCESS,
  payload: playlistData,
});

export const updatePlaylistReset = () => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_RESET,
});

export function updatePlaylist(playlistData) {
  return async function updatePlaylistThunk(dispatch) {
    dispatch(updatePlaylistRequest());
    try {
      const response = await api.updatePlaylistInfo(playlistData);
      if (response.errorMessage) {
        return dispatch(updatePlaylistError(response.errorMessage));
      }
      dispatch(updatePlaylistSuccess(response.data));
      return dispatch(updateUpdatedPlaylist(response.data.data));
    } catch (error) {
      return dispatch(updatePlaylistError(error.message));
    }
  };
}

// UPDATE THE STATE OF AN UPDATED PLAYLIST WITH ITS NEW INFO

export const updateUpdatedPlaylist = (playlist) => ({
  type: PlaylistTypes.UPDATE_UPDATED_PLAYLIST,
  payload: playlist,
});

// ADD CREATED SONG TO STATE

export const addCreatedPlaylist = (playlist) => ({
  type: PlaylistTypes.ADD_CREATED_PLAYLIST,
  payload: playlist,
});

// Follow playlist

export const followPlaylist = (playlistId, firebaseId) => {
  return async function followPlaylistThunk(dispatch) {
    dispatch(updatePlaylistRequest());
    try {
      const token = await getCurrentUserToken();
      const data = await api.followPlaylist(
        {
          Authorization: `Bearer ${token}`,
        },
        { playlistId, firebaseId },
      );
      return dispatch(updatePlaylistSuccess(data));
    } catch (err) {
      return dispatch(updatePlaylistError(err.message));
    }
  };
};

// Delete playlist

export const deletePlaylistRequest = () => ({
  type: PlaylistTypes.DELETE_PLAYLIST_REQUEST,
});

export const deletePlaylistError = (message) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_ERROR,
  payload: message,
});

export const deletePlaylistSuccess = (playlistId) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_SUCCESS,
  payload: playlistId,
});

export const deletePlaylistReset = () => ({
  type: PlaylistTypes.DELETE_PLAYLIST_RESET,
});

export function deletePlaylist(playlistId) {
  return async function deletePlaylistThunk(dispatch) {
    dispatch(deletePlaylistRequest());

    try {
      const response = await api.deletePlaylist(playlistId);
      if (response.errorMessage) {
        return dispatch(deletePlaylistError(response.errorMessage));
      }
      return dispatch(deletePlaylistSuccess(response.data));
    } catch (error) {
      return dispatch(deletePlaylistError(error.message));
    }
  };
}
