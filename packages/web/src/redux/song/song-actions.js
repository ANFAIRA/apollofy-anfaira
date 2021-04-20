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
