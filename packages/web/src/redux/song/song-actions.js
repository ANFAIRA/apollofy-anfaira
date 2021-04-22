import api from "../../api";
import * as auth from "../../services/auth";
import * as song from "./song-type";

export const fetchSongRequest = () => {
  return { type: song.FETCH_SONG_REQUEST };
};

export const fetchSongError = (message) => {
  return { type: song.FETCH_SONG_ERROR, payload: message };
};

export const fetchSongSuccess = (data) => {
  return { type: song.FETCH_SONG_SUCCESS, payload: data };
};

export const fetchSongReset = () => {
  return { type: song.FETCH_SONG_RESET };
};

export const fetchMeSongSuccess = (data) => {
  return { type: song.FETCH_ME_SONG_SUCCESS, payload: data };
};

export const fetchSong = () => {
  return async function fetchSongThunk(dispatch) {
    dispatch(fetchSongRequest());

    try {
      const songs = await api.getAllSongs();

      if (songs.errorMessage) {
        return dispatch(fetchSongError(songs.errorMessage));
      }

      return dispatch(fetchSongSuccess(songs));
    } catch (error) {
      return dispatch(fetchSongError(error.message));
    }
  };
};

export const fetchMeSong = () => {
  return async function fetchMeSongThunk(dispatch) {
    dispatch(fetchSongRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(fetchSongError("Uset token null"));
    }

    try {
      const meSongs = await api.getMeSongs({
        Authorization: `Bearer ${token}`,
      });

      if (meSongs.errorMessage) {
        return dispatch(fetchSongError(meSongs.errorMessage));
      }

      return dispatch(fetchMeSongSuccess(meSongs));
    } catch (error) {
      return dispatch(fetchSongError(error.message));
    }
  };
};
