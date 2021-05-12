import * as GenreTypes from "./genre-types";

export const GenreInitState = {
  genresLoading: false,
  genresLoadingError: null,
  genresFetched: false,
  genresByID: {},
  genreIds: [],
};

const GenreReducer = (state = GenreInitState, action) => {
  switch (action.type) {
    case GenreTypes.FETCH_GENRE_REQUEST: {
      return {
        ...state,
        genresLoading: true,
        genresLoadingError: null,
      };
    }
    case GenreTypes.FETCH_GENRE_ERROR: {
      return {
        ...state,
        genresLoading: false,
        genresLoadingError: action.payload,
      };
    }
    case GenreTypes.FETCH_GENRE_SUCCESS: {
      return {
        ...state,
        genresLoading: false,
        genresLoadingError: null,
        genresFetched: true,
        genresByID: action.payload.genresByID,
        genreIds: action.payload.genreIds,
      };
    }
    default: {
      return state;
    }
  }
};

export default GenreReducer;
