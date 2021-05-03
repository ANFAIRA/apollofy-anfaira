import api from "../../api";
import * as likedSongTypes from "./liked-songs-type";
import * as auth from "../../services/auth";

export const fetchLikedSongRequest = () => {
  return { type: likedSongTypes.FETCH_LIKED_SONG_REQUEST };
};

export const fetchLikedSongError = (message) => {
  return { type: likedSongTypes.FETCH_LIKED_SONG_ERROR, payload: message };
};

export const fetchLikedSongSuccess = (data) => {
  return { type: likedSongTypes.FETCH_LIKED_SONG_SUCCESS, payload: data };
};

export const fetchLikedSong = () => {
  return async function fetchLikedSongThunk(dispatch) {
    dispatch(fetchLikedSongRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(fetchLikedSongError("Uset token null"));
    }

    try {
      const LikedSongs = await api.getLikedSongs({
        Authorization: `Bearer ${token}`,
      });

      if (LikedSongs.errorMessage) {
        return dispatch(fetchLikedSongError(LikedSongs.errorMessage));
      }

      return dispatch(fetchLikedSongSuccess(LikedSongs));
    } catch (error) {
      return dispatch(fetchLikedSongError(error.message));
    }
  };
};
