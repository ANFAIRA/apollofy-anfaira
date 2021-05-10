import api from "../../api";
import { normalizeSongs } from "../../schema/song-schema";
import * as auth from "../../services/auth";
import * as SongTypes from "./song-types";
import { songsTypes } from "./song-types";

// FETCH SONGS

export const fetchSongsRequest = () => {
  return { type: SongTypes.FETCH_SONG_REQUEST };
};

export const fetchSongsError = (message) => {
  return { type: SongTypes.FETCH_SONG_ERROR, payload: message };
};

export const fetchSongsSuccess = ({
  type = songsTypes.ALL_SONGS,
  songsByID,
  songIds,
}) => {
  return {
    type: SongTypes.FETCH_SONG_SUCCESS,
    payload: { type: type, songsByID: songsByID, songIds: songIds },
  };
};

export function fetchSongs(fetchType) {
  switch (fetchType) {
    case songsTypes.ALL_SONGS:
      return fetchAllSongs();
    case songsTypes.MY_SONGS:
      return fetchMySongs();
    case songsTypes.FAVORITE:
      return fetchFavoriteSongs();
    case songsTypes.POPULAR:
      return fetchPopularSongs();
    default:
      break;
  }
  return fetchAllSongs();
}

// export const fetchSongsReset = () => {
//   return { type: SongTypes.FETCH_SONG_RESET };
// };

// Fetch all songs

export const fetchAllSongs = () => {
  return async function fetchSongThunk(dispatch) {
    dispatch(fetchSongsRequest());

    try {
      const songs = await api.getAllSongs();

      if (songs.errorMessage) {
        return dispatch(fetchSongsError(songs.errorMessage));
      }

      const normalizedSongs = normalizeSongs(songs.data);

      return dispatch(
        fetchSongsSuccess({
          type: songsTypes.ALL_SONGS,
          songsByID: normalizedSongs.entities.songs,
          songIds: normalizedSongs.result,
        }),
      );
    } catch (error) {
      return dispatch(fetchSongsError(error.message));
    }
  };
};

export const fetchMySongs = () => {
  return async function fetchMySongThunk(dispatch) {
    dispatch(fetchSongsRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(fetchSongsError("User token null"));
    }

    try {
      const MySongs = await api.getMeSongs({
        Authorization: `Bearer ${token}`,
      });

      if (MySongs.errorMessage) {
        return dispatch(fetchSongsError(MySongs.errorMessage));
      }

      const normalizedSongs = normalizeSongs(MySongs.data);

      return dispatch(
        fetchSongsSuccess({
          type: songsTypes.MY_SONGS,
          songsByID: normalizedSongs.entities.songs,
          songIds: normalizedSongs.result,
        }),
      );
    } catch (error) {
      return dispatch(fetchSongsError(error.message));
    }
  };
};

export const fetchFavoriteSongs = () => {
  return async function fetchLikedSongThunk(dispatch) {
    dispatch(fetchSongsRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(fetchSongsError("User token null"));
    }

    try {
      const LikedSongs = await api.getLikedSongs({
        Authorization: `Bearer ${token}`,
      });

      if (LikedSongs.errorMessage) {
        return dispatch(fetchSongsError(LikedSongs.errorMessage));
      }

      const normalizedSongs = normalizeSongs(LikedSongs.data);

      return dispatch(
        fetchSongsSuccess({
          type: songsTypes.FAVORITE,
          songsByID: normalizedSongs.entities.songs,
          songIds: normalizedSongs.result,
        }),
      );
    } catch (error) {
      return dispatch(fetchSongsError(error.message));
    }
  };
};

export const fetchPopularSongs = () => {
  return async function fetchPoupularSongThunk(dispatch) {
    dispatch(fetchSongsRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(fetchSongsError("User token null"));
    }

    try {
      const popularSongs = await api.getPopularSongs({
        Authorization: `Bearer ${token}`,
      });

      if (popularSongs.errorMessage) {
        return dispatch(fetchSongsError(popularSongs.errorMessage));
      }

      const popularSongsIds = popularSongs.data.data.map(
        (song) => song.metadata.song,
      );
      const normalizedSongs = normalizeSongs(popularSongsIds);

      return dispatch(
        fetchSongsSuccess({
          type: songsTypes.POPULAR,
          songsByID: normalizedSongs.entities.songs,
          songIds: normalizedSongs.result,
        }),
      );
    } catch (error) {
      return dispatch(fetchSongsError(error.message));
    }
  };
};

// LIKE SONGS

export const likeSongRequest = () => {
  return { type: SongTypes.LIKE_SONG_REQUEST };
};

export const likeSongError = (message) => {
  return { type: SongTypes.LIKE_SONG_ERROR, payload: message };
};

export const likeSongSuccess = (data) => {
  return { type: SongTypes.LIKE_SONG_SUCCESS, payload: data };
};
export const resetState = () => {
  return { type: SongTypes.RESET_STATE };
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

// Delete song

export const setSongToDelete = (songId) => ({
  type: SongTypes.SONG_TO_DELETE,
  payload: songId,
});

export const deleteSongRequest = () => ({
  type: SongTypes.DELETE_SONG_REQUEST,
});

export const deleteSongError = (message) => ({
  type: SongTypes.DELETE_SONG_ERROR,
  payload: message,
});

export const deleteSongSuccess = (songId) => ({
  type: SongTypes.DELETE_SONG_SUCCESS,
  payload: songId,
});

export const deleteSongReset = () => ({
  type: SongTypes.DELETE_SONG_RESET,
});

export function deleteSong(songId) {
  return async function deleteSongThunk(dispatch) {
    dispatch(deleteSongRequest());
    try {
      const response = await api.deleteSongApi(songId);
      if (response.errorMessage) {
        return dispatch(deleteSongError(response.errorMessage));
      }
      dispatch(deleteSongSuccess(response.data));
      return dispatch(deleteSongReset());
    } catch (error) {
      return dispatch(deleteSongError(error.message));
    }
  };
}

// UPDATE SONG

export const setSongToUpdate = (song) => ({
  type: SongTypes.SONG_TO_UPDATE,
  payload: song,
});

export const updateSongRequest = () => ({
  type: SongTypes.UPDATE_SONG_REQUEST,
});

export const updateSongError = (message) => ({
  type: SongTypes.UPDATE_SONG_ERROR,
  payload: message,
});

export const updateSongSuccess = (song) => ({
  type: SongTypes.UPDATE_SONG_SUCCESS,
  payload: song,
});

export const updateUpdatedSong = (song) => ({
  type: SongTypes.UPDATE_UPDATED_SONG,
  payload: song,
});

export const updateSongReset = () => ({
  type: SongTypes.UPDATE_SONG_RESET,
});

export function updateSong(song) {
  return async function updateSongThunk(dispatch) {
    dispatch(updateSongRequest());
    try {
      const response = await api.updateSongInfo(song);
      if (response.errorMessage) {
        return dispatch(updateSongError(response.errorMessage));
      }
      dispatch(updateSongSuccess(response.data));
      dispatch(updateUpdatedSong(response.data.data));
      return dispatch(updateSongReset());
    } catch (error) {
      return dispatch(updateSongError(error.message));
    }
  };
}

// ADD UPLOADED SONG TO STATE

export const addUploadedSong = (song) => ({
  type: SongTypes.ADD_UPLOADED_SONG,
  payload: song,
});

// SONG PLAYBACK
