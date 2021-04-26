import api from "../../api";
import * as meSongTypes from "./mySong-types";
import * as auth from "../../services/auth";

export const fetchMySongRequest = () => {
  return { type: meSongTypes.FETCH_MY_SONG_REQUEST };
};

export const fetchMySongError = (message) => {
  return { type: meSongTypes.FETCH_MY_SONG_ERROR, payload: message };
};

export const fetchMySongSuccess = (data) => {
  return { type: meSongTypes.FETCH_MY_SONG_SUCCESS, payload: data };
};

export const fetchMySongReset = () => {
  return { type: meSongTypes.FETCH_MY_SONG_RESET };
};

export const fetchMySong = () => {
  return async function fetchMySongThunk(dispatch) {
    dispatch(fetchMySongRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(fetchMySongError("Uset token null"));
    }

    try {
      const MySongs = await api.getMeSongs({
        Authorization: `Bearer ${token}`,
      });

      if (MySongs.errorMessage) {
        return dispatch(fetchMySongError(MySongs.errorMessage));
      }

      return dispatch(fetchMySongSuccess(MySongs));
    } catch (error) {
      return dispatch(fetchMySongError(error.message));
    }
  };
};
