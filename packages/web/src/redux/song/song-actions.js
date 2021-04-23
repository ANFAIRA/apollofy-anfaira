import api from "../../api";
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

export const playSong = (track) => {
  return { type: song.PLAY_SONG, payload: track };
};
