import api from "../../api";
import * as songTypes from "./song-type";
import * as auth from "../../services/auth";

export const fetchSongRequest = () => {
  return { type: songTypes.FETCH_SONG_REQUEST };
};

export const fetchSongError = (message) => {
  return { type: songTypes.FETCH_SONG_ERROR, payload: message };
};

export const fetchSongSuccess = (data) => {
  return { type: songTypes.FETCH_SONG_SUCCESS, payload: data };
};

export const fetchSongReset = () => {
  return { type: songTypes.FETCH_SONG_RESET };
};

export const fetchMeSongSuccess = (data) => {
  return { type: songTypes.FETCH_ME_SONG_SUCCESS, payload: data };
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

export const updateTrackRequest = (trackData) => ({
  type: songTypes.UPDATE_TRACK_REQUEST,
});

export const updateTrackError = (message) => ({
  type: songTypes.UPDATE_TRACK_ERROR,
  payload: message,
});

export const updateTrackSuccess = (trackData) => ({
  type: songTypes.UPDATE_TRACK_SUCCESS,
  payload: trackData,
});

export function editSong() {
  return async function editSongThunk(dispatch) {
    dispatch(updateTrackRequest);
    try {
      const response = await api.editSongInfo();
      if (response.errorMessage) {
        return dispatch(updateTrackError(response.errorMessage));
      }
      return dispatch(updateTrackSuccess(response.data));
    } catch (error) {
      return dispatch(updateTrackError(error.message));
    }
  };
}
export const fetchMeSong = () => {
  return async function fetchMeSongThunk(dispatch) {
    dispatch(fetchSongRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(fetchSongError("Uset token null"));
    }

    try {
      const MySongs = await api.getMeSongs({
        Authorization: `Bearer ${token}`,
      });

      if (MySongs.errorMessage) {
        return dispatch(fetchSongError(MySongs.errorMessage));
      }

      return dispatch(fetchMeSongSuccess(MySongs));
    } catch (error) {
      return dispatch(fetchSongError(error.message));
    }
  };
};
export const likeSongRequest = () => {
  return { type: song.LIKE_SONG_REQUEST };
};

export const likeSongError = (message) => {
  return { type: song.LIKE_SONG_ERROR, payload: message };
};

export const likeSongSuccess = (data) => {
  return { type: song.LIKE_SONG_SUCCESS, payload: data };
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
