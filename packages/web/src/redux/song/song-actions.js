import api from "../../api";
import * as songTypes from "./song-type";
import * as auth from "../../services/auth";
import { normalizeSongs } from "../../schema/song-schema";

export const fetchSongRequest = () => {
  return { type: songTypes.FETCH_SONG_REQUEST };
};

export const fetchSongError = (message) => {
  return { type: songTypes.FETCH_SONG_ERROR, payload: message };
};

export const fetchSongSuccess = ({ songsByID, songsIds }) => {
  return {
    type: songTypes.FETCH_SONG_SUCCESS,
    payload: { songsByID, songsIds },
  };
};

export const fetchSongReset = () => {
  return { type: songTypes.FETCH_SONG_RESET };
};

export const fetchSong = () => {
  return async function fetchSongThunk(dispatch) {
    dispatch(fetchSongRequest());

    try {
      const songs = await api.getAllSongs();
      console.log(
        "🚀 ~ file: song-actions.js ~ line 27 ~ fetchSongThunk ~ songs",
        songs,
      );

      if (songs.errorMessage) {
        return dispatch(fetchSongError(songs.errorMessage));
      }

      const normalizedSongs = normalizeSongs(songs.data);

      return dispatch(
        fetchSongSuccess({
          songsByID: normalizedSongs.entities.songs,
          songsIds: normalizedSongs.result,
        }),
      );
    } catch (error) {
      return dispatch(fetchSongError(error.message));
    }
  };
};

// export const fetchSongByIdRequest = () => ({
//   type: songTypes.FETCH_SONG_BY_ID_REQUEST,
// });

// export const fetchSongByIdError = (message) => ({
//   type: songTypes.FETCH_SONG_BY_ID_ERROR,
//   payload: message,
// });

// export const fetchSongByIdSuccess = (data) => ({
//   type: songTypes.FETCH_SONG_BY_ID_SUCCESS,
//   payload: data,
// });

// export const fetchSongByIdReset = () => ({
//   type: songTypes.FETCH_SONG_BY_ID_RESET,
// });

// export function fetchSongById() {
//   return async function fetchSongByIdThunk(dispatch) {
//     dispatch(fetchSongByIdRequest);
//     try {
//       const song = await api.getSong();

//       if (song.errorMessage) {
//         return dispatch(fetchSongByIdError(song.errorMessage));
//       }

//       return dispatch(fetchSongByIdSuccess(song));

//     } catch (error) {
//       return dispatch(fetchSongByIdError(error.message));
//     }
//   };
// }

export const likeSongRequest = () => {
  return { type: songTypes.LIKE_SONG_REQUEST };
};

export const likeSongError = (message) => {
  return { type: songTypes.LIKE_SONG_ERROR, payload: message };
};

export const likeSongSuccess = (data) => {
  return { type: songTypes.LIKE_SONG_SUCCESS, payload: data };
};
export const resetState = () => {
  return { type: songTypes.RESET_STATE };
};
export const likeSong = (songId, firebaseId) => {
  return async function likeThunk(dispatch) {
    dispatch(likeSongRequest());
    try {
      const token = await auth.getCurrentUserToken();
      const data = await api.likeSong(
        {
          Authorization: `Bearer ${token}`,
        },
        { songId, firebaseId },
      );
      return dispatch(likeSongSuccess(data));
    } catch (err) {
      return dispatch(likeSongError(err.message));
    }
  };
};
