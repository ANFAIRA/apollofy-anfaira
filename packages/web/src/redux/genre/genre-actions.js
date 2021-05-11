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
      console.log(res);
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
