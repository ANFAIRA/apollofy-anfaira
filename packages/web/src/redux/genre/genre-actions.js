import api from "../../api";
import { normalizeGenres } from "../../schema/genre-schema";
import * as GenreTypes from "./genre-types";

// FETCH GENRES

export const fetchGenresRequest = () => {
  return { type: GenreTypes.FETCH_GENRE_REQUEST };
};

export const fetchGenresError = (message) => {
  return { type: GenreTypes.FETCH_GENRE_ERROR, payload: message };
};

export const fetchGenresSuccess = ({ genresByID, genreIds }) => ({
  type: GenreTypes.FETCH_GENRE_SUCCESS,
  payload: {
    genresByID: genresByID,
    genreIds: genreIds,
  },
});

export function fetchGenres() {
  return async function fetchGenresThunk(dispatch) {
    dispatch(fetchGenresRequest());

    try {
      const res = await api.fetchPopularGenre();
      const normalizedGenres = normalizeGenres(res.data.data);
      return dispatch(
        fetchGenresSuccess({
          genresByID: normalizedGenres.entities.genres,
          genreIds: normalizedGenres.result,
        }),
      );
    } catch (err) {
      return dispatch(fetchGenresError(err.message));
    }
  };
}

// Delete song from genre

// export const setSongToDelete = (songId) => ({
//   type: SongTypes.SONG_TO_DELETE,
//   payload: songId,
// });

export const deleteSongFromGenreRequest = () => ({
  type: GenreTypes.DELETE_SONG_FROM_GENRE_REQUEST,
});

export const deleteSongFromGenreError = (message) => ({
  type: GenreTypes.DELETE_SONG_FROM_GENRE_ERROR,
  payload: message,
});

export const deleteSongFromGenreSuccess = (songId) => ({
  type: GenreTypes.DELETE_SONG_FROM_GENRE_SUCCESS,
  payload: songId,
});

export function deleteSongFromGenre({ genreId, songId }) {
  return async function deleteSongFromGenreThunk(dispatch) {
    dispatch(deleteSongFromGenreRequest());
    try {
      const response = await api.deleteSongFromGenre({
        genreId,
        songId,
      });
      if (response.errorMessage) {
        return dispatch(deleteSongFromGenreError(response.errorMessage));
      }
      return dispatch(deleteSongFromGenreSuccess());
    } catch (error) {
      return dispatch(deleteSongFromGenreError(error.message));
    }
  };
}
